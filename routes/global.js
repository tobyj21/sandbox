"use strict";
const csrf = require("./middleware/csrf");
const layoutVariables = require("./middleware/layoutVariables");

module.exports = function (app) {
   //Add CSRF token to all HTML layouts
   app.use(layoutVariables);

   //Add routes

   //Public page
   const publicPage = require("./public");
   app.use("/", publicPage);

   //Auth routes
   const auth = require("./auth");
   app.use("/", csrf.csrfSynchronisedProtection, auth);

   //Logged in pages
   const authenticated = require("./authenticated");
   app.use("/authenticated", authenticated);

   //Failure routes
   //CSRF
   app.use(function (err, req, res, next) {
      if (err.code !== "EBADCSRFTOKEN") return next(err);
      console.log("CSRF rejection on: " + req.url);
      res.status(403).send(`403: CSRF token rejected`);
   });

   //  404 page
   app.use(function (req, res, next) {
      res.status(404).send("404: page not found");
   });

   //  500 page
   app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500).send("500: app error");
   });

   return app;
};
