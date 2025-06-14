const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors")
const connectToDb = require("./db/db.js")
const users = require("./routes/users.routes.js")
const cookieParser = require("cookie-parser")
const captain = require("./routes/captain.routes.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser())


connectToDb();


app.use("/users", users)
app.use("/captain",captain)


app.get("/", (req, res) => {
    res.end("Hello dear uber rider ")
});








module.exports = app;