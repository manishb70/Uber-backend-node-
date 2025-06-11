const expres = require("express")
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blackListTokenModel = require("../models/blackListToken.model");







module.exports.authUser = async function (req, res, next) {


    const token = req.cookies.token || req.headers.authorization?.split(" ")[0]


    const isBlacklist = blackListTokenModel.find({token}) 




    if (!isBlacklist) {
        res.status(401).json({ message: "unautharized" })
    }

    if (!token) {
        res.status(401).json({ message: "unautharized" })
    }





    try {

        const userId = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(userId._id)





        if (!user) {
            res.status(401).json({ message: "unautharized" })
        }

        console.log(user);
        req.user = user;


        // console.log(user);



        return next();

        // console.log(token);

    } catch (e) {
        console.log(e);
        console.log("This the error from over server ");
        res.status(500).json({ "Message": "User not verifyed please login again" })
    }














}



