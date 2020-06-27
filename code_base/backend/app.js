const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

// db config get from config folder
const config = require("./config/keys");

const app = express();
// Connect to mongo
mongoose
	.connect(config.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected successfully!"))
	.catch((err) => console.log(err));

// body parser:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(flash());

//Session Stuff. DONT CHANGE ORDER
app.use(
	session({
		secret: config.SESSION_SECRET,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

app.use(passport.initialize());
app.use(passport.session());

// allow requests from other sources
var cors = require("cors");
var allowedOrigins = ["http://localhost:8000"];
app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

// routes
app.use("/", require("./src/routes/routes"));

app.listen(8080);
