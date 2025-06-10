const { validationResult } = require("express-validator")
const userModel = require("../models/user.model")

const userService = require("../services/user.service")





module.exports.registerUser = async function (req, res) {


    const errors = validationResult(req);

    // console.log(errors.errors);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            error: errors.errors
        })

    }

    const { fullname, email, password } = req.body;

    // console.log(fullname);
    // console.log(email);
    // console.log(password);
    const firstname = fullname.firstname
    const lastname = fullname.lastname

    const hashPassword = await userModel.hashPassword(password)
    // console.log(hashPassword);


    const user = await userService.createUser({ firstname, lastname, email, password: hashPassword })


    // console.log("User returned by userService.createUser():", user);


    const token = await user.generateAuthToken();

    console.log(token);

    res.status(200).json({
        user, token
    })
}




module.exports.login = async function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.errors
        })
    }

    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        res.send("Login failed")
    }       

    const comparePsd =  await user.comparePassword(password); 

    if(!comparePsd){
        res.send("Password dosn't match")
    }   

    const token = await user.generateAuthToken();
    
    res.cookie("token",token)
    res.status(200).json({
        user,token
    })
    

    // res.send("Welcome")



}







