//everything inside model folder: create database schema + define relationship

//use sequelize package
const Sequelize = require("sequelize");

//use sqlite database
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});

//create this model
const Model = Sequelize.Model;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class User extends Model {
    authenticate(rawPassword) {
        return bcrypt.compareSync(rawPassword, this.password_digest);
    }
    //set encrypted password
    set password(value) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(value, salt);
        this.password_digest = hash;
    }
    //get method for jwt token
    get token() {
        return jwt.sign({ id: this.id }, "constant_comment");
    }
    toJSON() {
        let jsonObject = { ...this.dataValues, token: this.token };
        delete jsonObject.password_digest;
        return jsonObject;
    }
}
//user model's schema
User.init(
    {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING
        },
        password_digest: {
            type: Sequelize.STRING
        },
        currentLanguage_id: {
            type: Sequelize.INTEGER
        },
        currentTopic_id: {
            type: Sequelize.INTEGER
        },
        points: {
            type: Sequelize.INTEGER
        },
    },
    {
        sequelize,
        modelName: "user"
    }
);

module.exports = User;

sequelize.sync();
