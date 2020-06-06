const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();
const mongoose = require("mongoose");

// db config get from config folder
const config = require("./config/keys");

// Connect to mongo
mongoose
	.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected successfully!"))
	.catch((err) => console.log(err));

// body parser:
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: config.SESSION_SECRET}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", require("./src/routes/routes"));

app.listen(8000);
