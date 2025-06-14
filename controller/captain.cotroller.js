
const { validationResult } = require("express-validator")
const captainService = require("../services/captain.service")
const captainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blackListToken.model")






module.exports.registerCaptain = async function (req, res, next) {

    const errors = validationResult(req);

    console.log(errors);


    if (!errors.isEmpty()) {


        return res.status(400).json({ "message": "please check required filed" })
    }


    const { fullname, email, password, vehicle } = req.body;


    const isAlready = await captainModel.findOne({ email })

    if (isAlready) {
        res.status(400).json({ message: "Email already used" })
    }





    const hashPassword = await captainModel.hashPassword(password)
    const captain = await captainService.createCaptain(fullname.firstname, fullname.lastname, hashPassword, email, vehicle.color, vehicle.plate, vehicle.capacity, vehicle.vehicleType)

    const token = await captain.genreateAuthToken();



    res.status(201).json({ token, captain })

    res.send("Hello manish")



}

module.exports.loginCaptain = async function (req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.send("invalid email or password")
    }

    const { email, password } = req.body;


    const captain = await captainModel.findOne({ email }).select("+password")

    if (!captain) {
        res.status(403).json({ success: false, message: "invalid email or password" })
    }

    const comparePsd = await captain.comparePassword(password)


    if(!comparePsd){
        res.status(400).json({message:"invalid email or passwor d"})
    }

    const token = await captain.genreateAuthToken();

    res.cookie("token",token)


res.status(200).json({token,captain})




}
 

module.exports.getProfile = async function(req,res,next){
    res.status(200).json(req.user)
}

module.exports.logOut =  async function(req,res,next){
 const token = req.cookies.token || req.headers.authorization?.split(" ")[0]

    await blackListTokenModel.create({"token":token})

    res.clearCookie("token")

    res.status(200).json("Logged out")

}