"use strict";
const { csrfSync } = require("csrf-sync");

const csrfProtection = csrfSync({
   getTokenFromState: (req) => {
      return req.session.csrfToken;
   },
   getTokenFromRequest: (req) => {
      let token = req.headers["x-csrf-token"];
      if (!token) token = req.body["CSRFToken"];
      return token;
   },
   storeTokenInState: (req, token) => {
      req.session.csrfToken = token;
   },
});

module.exports = csrfProtection;
