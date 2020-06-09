const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");

// db config get from config folder
const config = require("./config/keys");


const app = express();

// Connect to mongo
mongoose
	.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected successfully!"))
	.catch((err) => console.log(err));

// body parser:
app.use(express.urlencoded({ extended: false }));
//app.use(express.json);
app.use(session({secret: config.SESSION_SECRET}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", require("./src/routes/routes"));

app.listen(8000);
