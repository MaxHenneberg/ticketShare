const express = require("express");
const app = express();
const mongoose = require("mongoose");

// db config get from config folder
var db = require("./config/keys").MONGO_URL;

// Connect to mongo
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected successfully!"))
	.catch((err) => console.log(err));

// body parser:
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", require("./src/routes/routes"));

app.listen(3000);
