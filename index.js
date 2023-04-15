const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./controller/CategoriesController");
const articlesController = require("./controller/ArticlesController");

const Article = require("./models/Article");
const Category = require("./models/Category");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    });

app.use("/", categoriesController);
app.use("/", articlesController);
    

app.get("", (red, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Servidor rodando!");
});