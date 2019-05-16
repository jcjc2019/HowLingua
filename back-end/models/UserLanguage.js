//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//import Language User models
const Language = require("./Language");
const User = require("./User");

//define & create join table

UserLanguage = sequelize.define('user_language', {
    role: Sequelize.STRING
});

User.belongsToMany(Language, {
    through: UserLanguage
});
Language.belongsToMany(User, {
    through: UserLanguage
});

module.exports = UserLanguage

sequelize.sync()