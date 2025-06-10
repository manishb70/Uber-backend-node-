const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors")
const connectToDb = require("./db/db.js")





connectToDb();
app.use(cors());

app.get("/", (req, res) => {
    res.end("Hello dear uber rider ")
});




module.exports = app;