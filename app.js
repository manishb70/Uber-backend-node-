const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors")
const connectToDb = require("./db/db.js")
const users = require("./routes/users.routes.js")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser())


connectToDb();


app.use("/users", users)



app.get("/", (req, res) => {
    res.end("Hello dear uber rider ")
});








module.exports = app;