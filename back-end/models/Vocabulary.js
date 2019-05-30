//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//data type for table of this model
const Model = Sequelize.Model;

class Vocabulary extends Model { }
Vocabulary.init({
    character: {
        type: Sequelize.STRING,
        allowNull: false
    },
    transliteration: {
        type: Sequelize.STRING,
    },
    meaning: {
        type: Sequelize.STRING,
    }
}, {
        sequelize,
        modelName: 'vocabulary'
    })

module.exports = Vocabulary

sequelize.sync()