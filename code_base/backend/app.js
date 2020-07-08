const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const cookieParser = require('cookie-parser')

// db config get from config folder
const config = require("./config/keys");
const cors = require("cors");

const app = express();
// Connect to mongo
mongoose
.connect(config.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected successfully!"))
.catch((err) => console.log(err));

// body parser:
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser());
app.use(flash());

//Session Stuff. DONT CHANGE ORDER
app.use(session({
  secret: config.SESSION_SECRET,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors({credentials: true, origin: 'http://localhost:8000'}));

// routes
app.use("/", require("./src/routes/routes"));

app.listen(8080);
