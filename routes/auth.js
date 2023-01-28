"use strict";
var express = require("express");
var app = express();

const passport = require("passport");

//Form-based login
app.post("/login", function (req, res, next) {
   passport.authenticate("local", async function (err, user, info) {
      if (err) return next(err);
      //Handle unsuccessful authentication
      if (!user) {
         console.log("login fail");
         return res.redirect("/loginfail");
      }

      //Handle success
      req.logIn(user, function (err) {
         res.redirect("/authenticated");
      });
   })(req, res, next);
});

/*
//AJAX login
app.post("/ajaxLogin", function (req, res, next) {
   passport.authenticate("local", async function (err, user, info) {
      if (err) return next(err);
      //Handle unsuccessful authentication
      if (!user) {
         return res.send({
            outcome: "failed",
         });
      }

      //Handle success
      req.logIn(user, function (err) {
         if (err) return next(err);

         return res.send({
            outcome: "success",
         });
      });
   })(req, res, next);
});
*/

app.get("/loginfail", function (req, res) {
   res.render("auth/fail", {});
});

app.get("/logout", function (req, res) {
   req.logout(function (err) {
      if (err) {
         return next(err);
      }
      res.redirect("/");
   });
});

module.exports = app;
