"use strict";
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

passport.serializeUser(async (user, done) => {
   done(null, {});
});

passport.deserializeUser((userData, done) => {
   done(null, userData);
});

//Local strategy (email / password)
passport.use(
   new LocalStrategy({ usernameField: "email", passwordField: "password" }, async function (email, password, done) {
      let passwordMatch = "a" == password;
      if (passwordMatch) {
         return done(null, { username: "MrUser" });
      }

      return done(null, false, {
         message: "Password failure",
      });
   })
);
