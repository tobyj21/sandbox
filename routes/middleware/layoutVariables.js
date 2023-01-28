"use strict";
const csrf = require("./csrf");

module.exports = (req, res, next) => {
   res.locals = {
      csrfToken: csrf.generateToken(req),
   };
   next();
};
