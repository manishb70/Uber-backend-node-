const { validationResult } = require("express-validator")
const userModel = require("../models/user.model")

const userService = require("../services/user.service")





module.exports.register = async function (req, res) {


    const errors = validationResult(req);

    // console.log(errors.errors);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            error: errors.errors
        })

        
        
        
        
    }
    
    const {fullname,email,password} = req.body;

    // console.log(fullname);
    // console.log(email);
    // console.log(password);
    const firstname = fullname.firstname
    const lastname = fullname.lastname

    userService.createUser({firstname,lastname,email,password,email})





    // console.log(req.body);



    res.send("Hi manish youb are at the registration funcionality")
}




module.exports.login = function (req, res) {
    res.send("Hi manish you are success fully enbterd in the login functionality")
}







