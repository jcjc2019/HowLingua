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
       introduction: "A group of related varieties of Chinese spoken across most of northern and southwestern China. Mandarin is by far the largest of the seven or ten Chinese dialect groups, spoken by 70 percent of all Chinese speakers over a large geographical area, stretching from Yunnan in the southwest to Xinjiang in the northwest and Heilongjiang in the northeast.",
        imageURL: "https://res.cloudinary.com/dkzmc6kc1/image/upload/v1558710635/HowLingua/Mandarin_logo.png"
    },
    {
        name: "Japanese",
        introduction: "An East Asian language spoken by about 128 million people, primarily in Japan, where it is the national language. Japanese has been grouped with language families such as Ainu, Austroasiatic, and the now-discredited Altaic, but none of these proposals has gained widespread acceptance.",
        imageURL: "https://res.cloudinary.com/dkzmc6kc1/image/upload/v1558710630/HowLingua/Japanese_logo.png"
    },
    {
        name: "Cantonese",
        introduction: "A variety of Chinese originating from the city of Guangzhou (also known as Canton) and its surrounding area such as the city of Hong Kong in Southeastern China. It is the traditional prestige variety of the Yue Chinese dialect group, which has about 68 million speakers.",
        imageURL: "https://res.cloudinary.com/dkzmc6kc1/image/upload/v1558710630/HowLingua/Cantonese_logo.png"
    },
    {
        name: "Tamil",
        introduction: "A Dravidian language predominantly spoken by the Tamil people of India and Sri Lanka, and by the Tamil diaspora, Sri Lankan Moors, Douglas, and Chindians. Tamil is an official language of two countries: Sri Lanka and Singapore and official language of the Indian state Tamil Nadu.",
        imageURL: "https://res.cloudinary.com/dkzmc6kc1/image/upload/v1558710635/HowLingua/Tamil_logo.png"
    },
    {
        name: "Hebrew",
        introduction: "A Northwest Semitic language native to Israel; the modern version of which is spoken by over 9 million people worldwide. Hebrew belongs to the West Semitic branch of the Afroasiatic language family. Hebrew is the only living Canaanite language left, and the only truly successful example of a revived dead language.",
        imageURL: "https://res.cloudinary.com/dkzmc6kc1/image/upload/v1558710630/HowLingua/Hebrew_logo.png"
    },
    {
        name: "More Languages...",
        introduction: "More languages on the way...",
        imageURL: "https://res.cloudinary.com/dkzmc6kc1/image/upload/v1558710630/HowLingua/Empty_logo.png"
    }
]
languages.forEach(language => Language.create(language));

//create topics, 2 categories, 11 topics,
//1 more empty topics
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
    {
        category: "More...",
        name: "More on the way...",
        content: "More on the way...",        
    }
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
    },
    {
        userId: 4,
        topicId: 11,
    },
    {
        userId: 5,
        topicId: 11,
    }
];

userTopics.forEach(userTopic => UserTopic.create(userTopic));

//languageTopic
const languageTopics = [
    {
        languageId: 1,
        topicId: 1,
        details: `There are many ways of greeting others in Mandarin Chinese. The most commonly used word for "Hello!" is 你好！(Nǐ hǎo). It is widely used everywhere. Another commonly used word is 吃了吗？(Chī le ma). Its literal meaning is "Did you eat?" or "Have you eaten anything?". This is commonly used between people in the Northern part of China or between close friends. In addition, other commonly used words include 早上好！(Zǎo shàng hǎo), meaning "Good morning!" One would hear this word when s/he enters a restaurant or hotel in the morning, where the host or hostess will greets you by saying 早上好！. Of course, other similar expressions include 下午好！(Good afternoon!) and 晚上好！(Good evening!)`,
        vocabulary: "你好 (Nǐ hǎo);吃了吗 (Chī le ma);早上好 (Zǎo shàng hǎo);下午好 (Xià wǔ hǎo);晚上好 (Wǎn shàng hǎo)"
    },
    {
        languageId: 1,
        topicId: 2,
        details: `The way of saying goodbye to each other varies from people to pople. The most commonly used express is 再见（Zài jiàn）！. It can be used anywhere, either between familiar friends or people who meet each other for the first time. Sometimes, close friends or young people tend to use 拜拜（Bái bái）！, whose sound is close to the English word "Byebye!". Young people tend to use internet languages when texting each other, and therefore the ways of saying goodbye vary greatly. Since the Mandarin prounication of the number 88() is close to 拜拜, a commonly used phrase by netizens is 886（bā bā liù）! or 88（bā bā）!. The former resembles 拜拜了（Bái bái le）！while the latter resembles 拜拜！They are both used in text messages or online chatrooms.`,
        vocabulary: "再见 (Zài jiàn);拜拜 (Bái bái);了 (le); 八 (bā)",
    },
    {
        languageId: 1,
        topicId: 3,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 4,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 5,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 6,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 7,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 8,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 9,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 10,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 1,
        topicId: 11,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 1,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 2,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 3,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 4,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 5,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 6,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 7,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 8,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 9,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 10,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 2,
        topicId: 11,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 3,
        topicId: 11,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 4,
        topicId: 11,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 5,
        topicId: 11,
        details: "More to come...",
        vocabulary: "More to come...",
    },
    {
        languageId: 6,
        topicId: 11,
        details: "More to come...",
        vocabulary: "More to come...",
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
        options: "Hello;You;Good",
        answer: "You",
        type: "Choose the correct English translation",
        quizId: 1
    },
    {
        question: "好",
        options: "Hello;You;Good",
        answer: "Good",
        type: "Choose the correct English translation",
        quizId: 1
    },
    {
        question: "You",
        options: "Hello;You;Good",
        answer: "你",
        type: "Choose the correct Chinese translation",
        quizId: 1
    },
    {
        question: "Good",
        options: "你好;好;你",
        answer: "好",
        type: "Choose the correct Chinese translation",
        quizId: 1
    },
    {
        question: "Hello",
        options: "你好;好;你",
        answer: "你好",
        type: "Choose the correct Chinese translation",
        quizId: 1
    },
    {
        question: "你好",
        options: "Hello;You;Good",
        answer: "Hello",
        type: "Choose the correct English translation",
        quizId: 1
    },
    {
        question: "Choose the correct pronunciation for 你好.",
        options: "Nǐ hǎo;Nǐ;hǎo",
        answer: "Nǐ hǎo",
        type: "Pronunciation question",
        quizId: 1
    },
    {
        question: "Choose the correct pronunciation for 吃了吗.",
        options: "Nǐ hǎo;Chī le ma",
        answer: "Chī le ma",
        type: "Pronunciation question",
        quizId: 1
    },
    {
        question: "Choose the correct pronunciation for 早上好.",
        options: "Chī le ma;Zǎo shàng hǎo",
        answer: "Zǎo shàng hǎo",
        type: "Pronunciation question",
        quizId: 1
    },
    {
        question: "Listen and Repeat. 你好",
        answer: "你好",
        type: "Practice question",
        quizId: 1
    },
    {
        question: "Listen and Repeat. 吃了吗",
        answer: "吃了吗",
        type: "Practice question",
        quizId: 1
    },
    {
        question: "Listen and Repeat. 早上好",
        answer: "早上好",
        type: "Practice question",
        quizId: 1
    },
    {
        question: "You meet a new friend for the first time, what do you say?",
        options: "你好！（Hello）;吃了吗？(Did you eat)",
        answer: "你好！（Hello）",
        type: "Context question",
        quizId: 2
    },
    {
        question: "What's the greeting word used between close friends in the Northern part of China?",
        options: "你好！（Hello）;吃了吗？(Did you eat)",        
        answer: "吃了吗(Did you eat)？",        
        type: "Context question",
        quizId: 2
    },
    {
        question: "What's the greeting word used by the waitress when you walk into a restaurant in the morning?",
        options: "你好！（Hello）;吃了吗？(Did you eat);早上好！（Good morning!）",
        answer: "早上好！（Good morning!）",
        type: "Context question",
        quizId: 2
    }
]

questions.forEach(question => Question.create(question));

