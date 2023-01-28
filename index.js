"use strict";
const express = require("express");
const app = express();
app.set("view engine", "ejs");

// Parse post data as req.body
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
app.use(bodyParser.json({ limit: "15mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session handling
app.set("trust proxy", 1);
const session = require("express-session");
//Set session age to 2 hours
const sessionAge = 2 * 60 * 60 * 1000; // hour, min, sec, millisecond

var sessionConfig = {
   name: "sandboxSession",
   secret: "sandboxSessionSecret",
   resave: true,
   rolling: true,
   saveUninitialized: false,
   proxy: false,
   cookie: {
      key: "sandboxSessionCookie",
      secure: false,
      sameSite: "lax",
      httpOnly: true,
      maxAge: sessionAge,
   },
};
app.use(session(sessionConfig));

//Cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser("cookieSecret"));

// Load Passport
var passport = require("passport");
require("passport-local").Strategy;
require("./services/passportConfig");
app.use(passport.initialize());
app.use(passport.session());

//Load routes
require("./routes/global")(app);

//Make folders available to web requests
app.use(express.static("public"));

let port = 3003;
app.listen(port, () => {
   console.log(`Sandbox app listening at http://localhost:${port}`);
});
