const express = require("express");
const app = express();
const mongoose = require("mongoose");

// routes
app.use("/", require("./src/routes/routes"));

app.listen(3000);
