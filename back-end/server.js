// npm packages across socket and express
const pry = require("pryjs");
const jwt = require("jsonwebtoken");
const socketIo = require("socket.io");

//require models
const User = require('./models/User');
const Language = require('./models/Language');
const UserLanguage = require('./models/UserLanguage');
const Topic = require('./models/Topic');
const LanguageTopic = require('./models/LanguageTopic')
const UserTopic= require('./models/UserTopic');
const Vocabulary = require('./models/Vocabulary');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const textToSpeech = require('./textToSpeech')

//socket.io for user authentication and language change
//change localhost to ip address after deployment
//SOCKET.IO
const io = socketIo(8080, {
    handlePreflightRequest: function (req, res) {
        let headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});
//socket connections for user authentication
io.on("connection", socket => {
    if (socket.handshake.headers.authorization) {
        let [type, token] = socket.handshake.headers.authorization.split(" ");
        let result = jwt.decode(token);
        //put socket listeners available to registered users here.

        // socket.on("users.update", async params => {
        //     let user = await User.findByPk(params.id);
        //     await user.update(params);
        //     let users = await User.findAll();
        //     io.emit("users.updated", users);
        // });

        socket.on("user.update", async params => {
            let user = await User.findByPk(params.id);
            await user.update(params);
            io.emit("user.updated", user);
        });

        socket.on("user.delete", async payload => {
            let user = await User.findByPk(payload.user_id);
            await user.destroy();
            io.emit("user.deleted", user);
        });

        //find all languages belong to the user
        socket.on("userLanguages.index", async searchQuery => {
            let current_user = await User.findOne({where:{ id: searchQuery.id }});
            let userLanguages = await current_user.getLanguages();
            console.log(userLanguages)
            io.emit("userLanguages.found", userLanguages);
        });

        // socket.on("userLanguages.update", async params => {
        //     let userLanguage = await UserLanguage.findByPk(params.id);
        //     await userLanguage.update(params);

        //     let userLanguages = await UserLanguage.findAll();
        //     io.emit("userLanguages.updated", userLanguages);
        // });

        //text to speech socket connection
        socket.on('text.toSpeech', async vocabulary => {
            await textToSpeech(vocabulary.text, vocabulary.language)
            io.emit("tts.finished", { url: `http://localhost:3001/public/${vocabulary.text}_output.wav`})
        })

        //find topics belong to a language
        socket.on("FindTopicDetails", async searchQuery => {
            let language = await Language.findOne({
                where: { name: searchQuery.language }
            })
            let topicDetails = await LanguageTopic.findOne({
                where: {
                    languageId: language.id,
                    topicId: searchQuery.topicId
                }
            })
            console.log("boops")
            console.log(searchQuery.topicId, language.id);
            console.log(topicDetails)
            io.emit("TopicDetailsFound", topicDetails)
        })

        //find quizzes belong to a topic of a specific language
        socket.on("FindQuizzes", async searchQuery => {
            let language = await Language.findOne({
                where: { name: searchQuery.language }
            })
            let quizzes = await Quiz.findAll({
                where: {
                    languageId: language.id,
                    topicId: searchQuery.topicId
                }
            })
            //send quizzes back to front end
            io.emit("QuizzesFound", quizzes)
        })

        //find all questions belong to a quiz
        socket.on("FindQuestions", async searchQuery => {
            let quizId = searchQuery.quizId
            let current_quiz = await Quiz.findOne({ where: { id: quizId } })
            let questions = await current_quiz.getQuestions()
            console.log(questions)
            //send question data back to front-end
            io.emit("QuestionsFound", questions)
        })

        //signed in users, find all vocabulary belong to a topic
        //put vocabulary on QuizContainer, pass to SingleQuizCard
        socket.on("FindVocabularyForThisTopic", async searchQuery => {
            let topicId = searchQuery.topicId
            let currentLanguage = await Language.findOne({
                where: {
                    name: searchQuery.language
                }
            })
            let vocabularyForCurrentTopic = await Vocabulary.findAll({
                where: {
                    topicId: topicId,
                    languageId: currentLanguage.id
                }
            })
            console.log(vocabularyForCurrentTopic)
            io.emit("VocabularyFound", vocabularyForCurrentTopic)
        })

        //signed in users, find all topics belong to this user
        socket.on("FindUserTopics", async searchQuery => {
            let currentUser = await User.findOne({
                where: {
                    id: searchQuery.id
                }
            })
            let userTopics = await currentUser.getTopics()
            console.log(userTopics)
            io.emit("UserTopicsFound", userTopics)
        })

        //signed in users, add new language and topic
        socket.on('addLanguageAndTopic', async searchQuery => {
            let currentUser = await User.findOne({
                where: {
                    id: searchQuery.userid
                }
            })
            let language = await Language.findOne({
                where: {
                    name: searchQuery.language
                }
            })
            let topic = await Topic.findOne({
                where: {
                    category: searchQuery.topic
                }
            })
            language.addUser(currentUser.id)
            topic.addUser(currentUser.id)
        })

    } else {
        console.log(
            "\x1b[31m",
            "Not authorized user. Only a few available"
        );
        //socket.disconnect(true);
        //text to speech socket connection
        socket.on('text.toSpeech', async vocabulary => {
            await textToSpeech(vocabulary.text, vocabulary.language)
            io.emit("tts.finished", { url: `http://localhost:3001/public/${vocabulary.text}_output.wav` })
        })
    }

});



//EXPRESS: npm packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//EXPRESS: create server as app
const app = express();

//use middleware for express
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('public'));


//set charSet for all apis
app.all("*", function (req, res, next) {
    // res.header("Access-Control-Allow-Credentials", 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header("Content-Length", "2000");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

//http methods for user model, API
app.get("/users", (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    });
});

app.post("/users", async (req, res) => {
    //create new user
    let newUser = User.build();
    //set up properties
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.points = req.body.points;
    newUser.currentLanguage = req.body.currentLanguage
    newUser.currentTopic = req.body.currentTopic
    newUser.avatar = req.body.avatar
    //save newUser to database
    newUser.save().then(newUser =>
        // console.log(newUser);
        res.json(newUser)
    );
    let currentLanguage = await Language.findOne({ where: { name: newUser.currentLanguage}})
    let currentTopic = await Topic.findAll({where: {category: newUser.currentTopic}})
    newUser.addLanguage(currentLanguage, { through: { role: 'learner' } })
    newUser.addTopic(currentTopic, { through: { role: 'learner' } } )
});

app.get("/users/:id", (req, res) => {
    User.findByPk(req.params.id).then(user => {
        res.json(user);
    });
});

app.patch("/users/:id", async (req, res) => {
    let user = await User.findByPk(req.params.id);
    user.update(req.body);
});

app.delete("/users/:id", async (req, res) => {
    let user = await User.findByPk(req.params.id);
    // console.log(user);
    user.destroy(req.body);
});

//http methods for language model, API
app.get("/languages", (req, res) => {
    Language.findAll().then(languages => {
        res.json(languages);
    });
});

app.get("/languages/:id", (req, res) => {
    Language.findByPk(req.params.id).then(language => {
        res.json(language);
    });
});

app.post("/languages", (req, res) => {
    //create new language instance
    let newLanguage = Language.build();
    //set up properties
    newLanguage.name = req.body.name;
    newLanguage.region = req.body.region;
    newLanguage.description = req.body.description;
    //save newLanguage to user's database
    newLanguage
        .save()
        //link language to specific user
        .then(savedLanguage => {
            //find user by the userid stored in localStorage
            User.findByPk(localStorage.userid).then(user => {
                user.addLanguage(savedLanguage, { through: { role: "learner" } });
            });
            // console.log(savedLanguage);
            io.emit("languageAdded", savedLanguage);
            res.status(200);
        });
});


//http methods for topic model, API
app.get("/topics", (req, res) => {
   Topic.findAll().then(topics => {
        res.json(topics);
    });
});

app.get("/topics/:id", (req, res) => {
    Topic.findByPk(req.params.id).then(topic => {
        res.json(topic);
    });
});

app.post("/topics", (req, res) => {
    //create new script
    let newTopic = Topic.build();
    //set up properties
    newTopic.category = req.body.category;
    newTopic.name = req.body.name;
    newTopic.content = req.body.content;
    //save newTopic to user's database
    newTopic
        .save()
        //link Topic to specific user
        .then(savedTopic => {
            User.findByPk(localStorage.userid).then(user => {
                user.addTopic(savedTopic, { through: { role: "learner" } });
            });
            io.emit("TopicAdded", savedTopic);
            res.status(200);
        });
});

//http methods for vocabulary model, API
app.get("/vocabularies", (req, res) => {
    Vocabulary.findAll().then(vocabularies => {
        res.json(vocabularies);
    });
});

app.get("/vocabularies/:id", (req, res) => {
    Vocabulary.findByPk(req.params.id).then(vocabulary => {
        res.json(vocabulary);
    });
});

app.post("/vocabularyGroup", async (req, res) => {
    let currentLanguage = await Language.findOne({
        where: {
            name: req.body.currentLanguage
        }
    })
    Vocabulary.findAll({
        where:
        {
            topicId: req.body.topicId,
            languageId: currentLanguage.id
        }
    }).then(vocabularyGroup => {
        res.json(vocabularyGroup)
    })
})

app.post("/vocabularyForUnSignedIn", async (req, res) => {
    let currentLanguage = await Language.findOne({
        where: {
            name: req.body.currentLanguage
        }
    })
    let currentTopic = await Topic.findOne({
        where: {
            category: req.body.currentTopic
        }
    })
    Vocabulary.findAll({
        where:
        {
            topicId: currentTopic.id,
            languageId: currentLanguage.id
        }
    }).then(vocabularyGroup => {
        res.json(vocabularyGroup)
    })
})

//http methods for quiz model, API
app.get("/quizzes", (req, res) => {
    Quiz.findAll().then(quizzes => {
        res.json(quizzes);
    });
});

app.get("/quizzes/:id", (req, res) => {
    Quiz.findByPk(req.params.id).then(quiz => {
        res.json(quiz);
    });
});

//http method for getting specific topic's quizzes
app.get("/topics/:id/quizzes", (req, res) => {
    Topic.findByPk(req.params.id).then(topic => {
        topic.getQuizzes().then(quizzes => res.json(quizzes))
    })
})

//http methods for question model, API
app.get("/questions", (req, res) => {
    Question.findAll().then(questions => {
        res.json(questions);
    });
});

app.get("/questions/:id", (req, res) => {
    Question.findByPk(req.params.id).then(question => {
        res.json(question);
    });
});

//http method for getting specific quiz's questions
app.get("/quizzes/:id/questions", (req, res) => {
    Quiz.findByPk(req.params.id).then(quiz => {
        quiz.getQuestions().then(questions => res.json(questions))
    })
})


//http methods for many-many join tables.
//1. userLanguage model, API
app.get("/userLanguages", (req, res) => {
    UserLanguage.findAll().then(userLanguages => {
        res.json(userLanguages);
    });
});

//show specific users' languages
app.get("/users/:id/languages", (req, res) => {
    User.findByPk(req.params.id).then(user => {
        user.getLanguages().then(languages => res.json(languages));
    });
})

//show specific languages' users
app.get("/languages/:id/users", (req, res) => {
    Language.findByPk(req.params.id).then(language => {
        language.getUsers().then(users => res.json(users));
    });
});

//2. languageTopic model, API
app.get("/languageTopics", (req, res) => {
    LanguageTopic.findAll().then(languageTopics => {
        res.json(languageTopics);
    });
});

//show specific language's topics
app.get("/languages/:id/topics", (req, res) => {
    Language.findByPk(req.params.id).then(language => {
        language.getTopics().then(topics => res.json(topics));
    });
})

//show specific topic's language
app.get("/topics/:id/languages", (req, res) => {
    Topic.findByPk(req.params.id).then(topic => {
        topic.getLanguages().then(languages => res.json(languages));
    });
});

//3. userTopic model, API
app.get("/userTopics", (req, res) => {
    UserTopic.findAll().then(userTopics => {
        res.json(userTopics);
    });
});


// app.get("/users/:id/topics", (req, res) => {
//     User.findByPk(req.params.id).then(user => {
//         user.getTopics().then(topics => res.json(topics));
//     });
// })

//show specific topic's user
app.get("/topics/:id/users", (req, res) => {
    Topic.findByPk(req.params.id).then(topic => {
        topic.getUsers().then(users => res.json(users));
    });
});

//post method for Login and Sign Up Form,

//http method for login page
app.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        // console.log(user);
        if (user.authenticate(req.body.password)) {
            res.json(user);
        }
    });
});

//port for express
app.listen(3001);

// eval(pry.it)