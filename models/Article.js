const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("./Category");

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false, 
    }
});

Category.hasMany(Article); //One to Many
Article.belongsTo(Category); // One to One

Article.sync({force: false});

module.exports = Article;