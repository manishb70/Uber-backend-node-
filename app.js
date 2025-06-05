const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors")


const port = process.env.PORT||3000 ;



app.use(cors());

app.get("/",(req,res)=>{
    res.end("Hello dear uber rider ")
});




module.exports=app;