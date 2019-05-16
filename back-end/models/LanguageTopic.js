//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//import Language Topic models
const Language = require("./Language");
const Topic = require("./Topic");

//define & create join table

LanguageTopic = sequelize.define('language_topic', {
    role: Sequelize.STRING
});

Language.belongsToMany(Topic, {
    through: TopicLanguage
});

Topic.belongsToMany(Language, {
    through: LanguageTopic
});

module.exports = LanguageTopic

sequelize.sync()