const express = require("express")
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controller/captain.cotroller")
const auth = require("../middlewares/auth.middleware")

router.get("/", (req, res) => {

    res.send("Hello gyus my name is manish")
})


router.get("/register", [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("The first name is minimum 3 digit required"),
    body("password").isLength({ min: 3 }).withMessage("The first name is minimum 3 digit required"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color mininmum 3 digit is required"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate number required"),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("minimum 1 capacity are required"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("minimum 1 capacity are required"),
    body("email").isEmail().withMessage("invalid email"),


], captainController.registerCaptain)

router.get("/login", [

    body("password").isLength({ min: 3 }).withMessage("The first name is minimum 3 digit required"),
    body("email").isEmail().withMessage("invalid email")


], captainController.loginCaptain)



router.get("/profile", auth.authCaptain, captainController.getProfile)
router.get("/logOut", auth.authCaptain, captainController.logOut)














module.exports = router;