"use strict";
var express = require("express");
var app = express();

const isAuthenticated = require("./middleware/isAuthenticated");

//Home page
app.get("/", isAuthenticated, async function (req, res, next) {
   res.render("authenticated/authenticated", {});
});

module.exports = app;
