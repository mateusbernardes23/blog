const express = require("express");
const router = express.Router();
const slugify = require("slugify");

const Category = require("../models/Category");
const Article = require("../models/Article");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{
            model: Category
        }]
    }).then((articles) => {
        res.render("admin/articles/index", {articles: articles});
    })
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    })
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var bodyArticle = req.body.body;
    var categoryId = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: bodyArticle,
        categoryId: categoryId,
    }).then(() => {
        res.redirect("/admin/articles")
    })
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {id: id},
            }).then(() => {
                res.redirect("/admin/articles");
            })
        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit",{article: article, categories: categories});
            });
        } else {
            res.redirect("/admin/articles");
        };
    }).catch(erro => {
        res.redirect("admin/articles")
    });
});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var categoryId = req.body.category;
    var body = req.body.body;
    if (title != undefined) {
        Article.update({title: title, slug: slugify(title), body: body, categoryId: categoryId}, {
            where: {id: id},
        }).then(() => {
            res.redirect("/admin/articles");
        });
    } else {
        res.redirect("/admin/articles/new");
    }
});
// eslint-disable-next-line no-undef
module.exports = router;