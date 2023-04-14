const express = require("express");
const app = express();

app.get("", (red, res) => {
    res.send("Bem vindo ao site");
});

app.listen(3000, () => {
    console.log("Servidor rodando!");
});