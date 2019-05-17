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
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');

//socket.io for user authentication and language change
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
        // let userId = result.id;
    } else {
        console.log(
            "\x1b[31m",
            "--------------------------------------------------- YOU DONE GOT KICKED OUT ---------------------------------------------------"
        );
        socket.disconnect(true);
    }

    //socket connections for user model
    socket.on("users.index", respond => {
        User.findAll().then(users => {
            respond(users);
        });
    });

    socket.on("users.update", async params => {
        let user = await User.findByPk(params.id);
        await user.update(params);
        let users = await User.findAll();
        io.emit("users.updated", users);
    });

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

    //socket connections for language model
    socket.on("languages.index", respond => {
        User.findAll().then(languages => {
            respond(languages);
        });
    });

    //find all languages belong to the user
    socket.on("userLanguages.index", respond => {
        UserLanguage.findAll().then(userLanguages => {
            respond(userLanguages);
        });
    });

    socket.on("userLanguages.update", async params => {
        let userLanguage = await UserLanguage.findByPk(params.id);
        await userLanguage.update(params);

        let userLanguages = await UserLanguage.findAll();
        io.emit("userLanguages.updated", userLanguages);
    });

    //socket connections for topic model
    socket.on("topics.index", respond => {
        User.findAll().then(topics => {
            respond(topics);
        });
    });

    //find all topics belong to the user
    socket.on("userTopics.index", respond => {
        UserTopic.findAll().then(userTopics => {
            respond(userTopics);
        });
    });

    socket.on("userTopics.update", async params => {
        let userTopic = await UserTopic.findByPk(params.id);
        await userTopic.update(params);

        let userTopics = await UserTopic.findAll();
        io.emit("userTopics.updated", userTopics);
    });
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

app.post("/users", (req, res) => {
    //create new user
    let newUser = User.build();
    //set up properties
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.points = req.body.points;
    newUser.currentLanguage_id = req.body.currentLanguage_id
    newUser.currentTopic_id = req.body.currentTopic_id
    newUser.avatar = req.body.avatar
    //save newUser to database
    newUser.save().then(newUser =>
        // console.log(newUser);
        res.json(newUser)
    );
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
    console.log(user);
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
            User.findByPk(req.body.userid).then(user => {
                user.addLanguage(savedLanguage, { through: { role: "learner" } });
            });
            console.log(savedLanguage);
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
            User.findByPk(req.body.userid).then(user => {
                user.addTopic(savedTopic, { through: { role: "learner" } });
            });
            io.emit("TopicAdded", savedTopic);
            res.status(200);
        });
});

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

//show specific user's topics
app.get("/users/:id/topics", (req, res) => {
    User.findByPk(req.params.id).then(user => {
        user.getTopics().then(topics => res.json(topics));
    });
})

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
        console.log(user);
        if (user.authenticate(req.body.password)) {
            res.json(user);
        }
    });
});

//port for express
app.listen(3001);

// eval(pry.it)