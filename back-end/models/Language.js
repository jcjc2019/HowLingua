//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

const Vocabulary = require("./Vocabulary")

//use sqlite database
const sequelize = new Sequelize({
    //use sqlite database
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//data type for table of this model
const Model = Sequelize.Model;

class Language extends Model { }
Language.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    introduction: {
        type: Sequelize.STRING
    },
    imageURL: {
        type: Sequelize.STRING
    }
}, {
        sequelize,
        modelName: 'language'
    })

module.exports = Language

sequelize.sync()

//A language has many vocabularies, add LanguageId to vocabulary table
Language.hasMany(Vocabulary, { as: 'Vocabularies' })
