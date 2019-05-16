//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//import Topic User models
const Topic = require("./Topic");
const User = require("./User");

//define & create join table

UserTopic = sequelize.define('user_topic', {
    role: Sequelize.STRING
});

User.belongsToMany(Topic, {
    through: UserTopic
});
Topic.belongsToMany(User, {
    through: UserTopic
});

module.exports = UserTopic

sequelize.sync()