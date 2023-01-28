"use strict";

//Sqreen security
let sqreen;
if (["PROD", "STAGING"].includes(process.env.ENVIRONMENT)) {
   sqreen = require("sqreen");
}

module.exports = (req, res, next) => {
   if (req.user) {
      next();
   } else {
      console.log("NOT LOGGED IN");
      res.redirect("/");
   }
};
