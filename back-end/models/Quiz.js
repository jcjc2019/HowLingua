//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');
//model for relation
const Topic = require("./Topic");

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//data type for table of this model
const Model = Sequelize.Model;

class Quiz extends Model { }
Quiz.init({
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'quiz'
    })

module.exports = Quiz

sequelize.sync()

//A topic has many quizzes
Quiz.belongsTo(Topic)