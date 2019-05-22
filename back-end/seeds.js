//require models
const User = require('./models/User');
const Language = require('./models/Language');
const UserLanguage = require('./models/UserLanguage');
const Topic = require('./models/Topic');
const LanguageTopic = require('./models/LanguageTopic')
const UserTopic = require('./models/UserTopic');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');

//use faker for fake user data
const faker = require('faker');

User.sync();
// User.destroy({where: {}})
Language.sync();
// Language.destroy({where: {}})
UserLanguage.sync();
// UserLanguage.destroy({where:{}})
Topic.sync();
// Topic.destroy({where: {}})
UserTopic.sync();
// UserTopic.destroy({where:{}})
LanguageTopic.sync();
//LanguageTopic.destroy({where:{}})
Quiz.sync();
// Quiz.destroy({where: {}})
Question.sync();
//Question.destroy({where:{}})

//NOTE: 
//after user authentication added, 
//we can only use sign up form to sign up for an account

//CREATE 50 FAKE USERS
const createFakeUser = ()=>(
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    //password: fake.internet.password(), get random password
    //fake data, needs to get password_digest, so all users share 'password' as password
    password: 'password',
    password_digest: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    points: faker.random.number({
        min: 0,
        max: 200000
    }),
    avatar: faker.random.image(),
  });

const bcrypt = require("bcrypt");

const fakeUsers = [
    {
        username: 'jing',
        email: 'jingchenjc2019@gmail.com',
        password: 'password',
        password_digest: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        points: 0,
        avatar: 'https://i.pinimg.com/originals/ed/26/24/ed2624b5b93f6537d185a76a2517ccef.png'
    }
];
const numberOfUsers = 50;
for(let i=0; i < numberOfUsers; i++){
    fakeUsers.push(createFakeUser())
}
fakeUsers.forEach(fakeUser => User.create(fakeUser));

//create 2 languages
const languages = [
    {
       name: "Mandarin",
       region: "China"
    },
    {
        name: "Japanese",
        region: "Japan"
    }
]
languages.forEach(language => Language.create(language));

//create topics, 2 categories, 11 topics
const topics = [
    {
        category: "greetings",
        name: "hello",
        content: "Greeting word",
    },
    {
        category: "greetings",
        name: "goodbye",
        content: "Farewell word",
    },
    {
        category: "courtesy",
        name: "thank you",
        content: "Courtesy word",
    },
    {
        category: "courtesy",
        name: "my pleasure/you are welcome",
        content: "Courtesy word",
    }, 
    {
        category: "introduction",
        name: "My name is",
        content: "Self-introduction Name",
    }, 
    {
        category: "introduction",
        name: "I am from",
        content: "Self-introduction Country",
    }, 
    {
        category: "introduction",
        name: "I am a",
        content: "Self-introduction Profession",
    }, 
    {
        category: "introduction",
        name: "I study",
        content: "Self-introduction Education",
    }, 
    {
        category: "introduction",
        name: "My major is",
        content: "Self-introduction Major",
    }, 
    {
        category: "introduction",
        name: "Nice to meet you",
        content: "Self-introduction Set Phrase",
    }, 
];

topics.forEach(topic => Topic.create(topic));

//userLanguage
const userLanguages = [
    {
        userId: 1,
        languageId: 1,
        role: "learner"
    },
    {
        userId: 2,
        languageId: 2,
        role: "learner"
    },
    {
        userId: 3,
        languageId: 1,
        role: "learner"
    },
    {
        userId: 3,
        languageId: 2,
        role: "learner"
    }
];

userLanguages.forEach(userLanguage => UserLanguage.create(userLanguage));

//userTopic
const userTopics = [
    {
        userId: 1,
        topicId: 1
    },
    {
        userId: 1,
        topicId: 2
    },
    {
        userId: 1,
        topicId: 3
    },
    {
        userId: 2,
        topicId: 1
    },
    {
        userId: 2,
        topicId: 2
    },
    {
        userId: 2,
        topicId: 3
    },
    {
        userId: 2,
        topicId: 4
    },
    {
        userId: 2,
        topicId: 5,
    },
    {
        userId: 2,
        topicId: 6,
    },
    {
        userId: 3,
        topicId: 1,
    },
    {
        userId: 3,
        topicId: 2,
    },
    {
        userId: 3,
        topicId: 3,
    },
    {
        userId: 3,
        topicId: 4,
    },
    {
        userId: 3,
        topicId: 5,
    },
    {
        userId: 3,
        topicId: 6,
    },
    {
        userId: 3,
        topicId: 7,
    },
    {
        userId: 3,
        topicId: 8,
    },
    {
        userId: 3,
        topicId: 9,
    },
    {
        userId: 3,
        topicId: 10,
    },
    {
        userId: 3,
        topicId: 11,
    }
];

userTopics.forEach(userTopic => UserTopic.create(userTopic));

//languageTopic
const languageTopics = [
    {
        languageId: 1,
        topicId: 1,
    },
    {
        languageId: 1,
        topicId: 2,
    },
    {
        languageId: 1,
        topicId: 3,
    },
    {
        languageId: 1,
        topicId: 4,
    },
    {
        languageId: 1,
        topicId: 5,
    },
    {
        languageId: 1,
        topicId: 6,
    },
    {
        languageId: 1,
        topicId: 7,
    },
    {
        languageId: 1,
        topicId: 8,
    },
    {
        languageId: 1,
        topicId: 9,
    },
    {
        languageId: 1,
        topicId: 10,
    },
    {
        languageId: 1,
        topicId: 11,
    },
    {
        languageId: 2,
        topicId: 1,
    },
];
languageTopics.forEach(languageTopic => LanguageTopic.create(languageTopic));

//quizzes
const quizzes = [
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "1",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "1",
    },
    {
        type: "vocabulary",
        languageId: "2",
        topicId: "1",
    },
    {
        type: "culture",
        languageId: "2",
        topicId: "1",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "2",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "2",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "3",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "3",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "4",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "4",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "5",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "5",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "6",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "6",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "7",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "7",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "8",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "8",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "9",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "9",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "10",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "10",
    },
    {
        type: "vocabulary",
        languageId: "1",
        topicId: "11",
    },
    {
        type: "culture",
        languageId: "1",
        topicId: "11",
    },
]

quizzes.forEach(quiz => Quiz.create(quiz));

//questions

const questions = [
    {
        question: "你",
        answer: "You",
        type: "Choose the correct English translation",
        quizId: 1
    },
    {
        question: "好",
        answer: "Good",
        type: "Choose the correct English translation",
        quizId: 1
    },
    {
        question: "You",
        answer: "你",
        type: "Choose the correct Chinese translation",
        quizId: 1
    },
    {
        question: "Good",
        answer: "好",
        type: "Choose the correct Chinese translation",
        quizId: 1
    },
    {
        question: "Hello",
        answer: "你好",
        type: "Choose the correct Chinese translation",
        quizId: 1
    },
    {
        question: "你好",
        answer: "Hello",
        type: "Choose the correct English translation",
        quizId: 1
    },
    {
        question: "你好",
        answer: "Nǐ hǎo",
        type: "How to pronounce this word?",
        quizId: 1
    },
    {
        question: "A. 你 \nB. 好\nC. 你好\n",
        answer: "C. 你好",
        type: "Suppose you meet a friend named Li Hao for the first time, what to say?",
        quizId: 2
    },
    {
        question: "A. Hello (你好) \nB. Did you eat? (吃了吗?) \nC. Good morning! (早上好！）\n",
        answer: "A. Hello (你好)",
        type: "What's the most commonly used greeting word by Chinese people?",
        quizId: 2
    },
    {
        question: "A. Hello (你好) \nB. Did you eat? (吃了吗?) \nC. Good morning! (早上好！）\n",
        answer: "B. Did you eat? (吃了吗?)",
        type: "What's the greeting word used between close friends?",
        quizId: 2
    },
    {
        question: "A. Hello (你好) \nB. Did you eat? (吃了吗?) \nC. Good morning! (早上好！）\n",
        answer: "C. Good morning! (早上好！）",
        type: "What's the greeting word used by the waitress when you walk into a restaurant in the morning?",
        quizId: 2
    }
]

questions.forEach(question => Question.create(question));

