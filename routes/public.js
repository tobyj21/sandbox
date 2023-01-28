"use strict";
var express = require("express");
var app = express();

//Home page
app.get("/", async function (req, res, next) {
   res.render("public/home", {});
});

module.exports = app;
