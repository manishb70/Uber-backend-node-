const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors")
const connectToDb = require("./db/db.js")
const users = require("./routes/users.routes.js")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


connectToDb();
app.use(cors());

app.use("/users",users)



app.get("/", (req, res) => {
    res.end("Hello dear uber rider ")
});








module.exports = app;