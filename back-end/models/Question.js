//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');
//model for relation
const Quiz = require("./Quiz");

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//data type for table of this model
const Model = Sequelize.Model;

class Question extends Model { }
Question.init({
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
    }
}, {
        sequelize,
        modelName: 'question'
    })

module.exports = Question

sequelize.sync()

//A quiz has many questions, add quizId
Question.belongsTo(Quiz)