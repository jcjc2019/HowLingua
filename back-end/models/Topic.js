//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

const Quiz = require("./Quiz");

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//data type for table of this model
const Model = Sequelize.Model;

class Topic extends Model { }
Topic.init({
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'topic'
    })

module.exports = Topic

sequelize.sync()

//A topic has many quizzes, add topicId to quiz table
Topic.hasMany(Quiz, {as: 'Quizzes'})