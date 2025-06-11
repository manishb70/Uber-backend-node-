const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller")
const { body, validationResult } = require("express-validator")
const authUser = require("../middlewares/auth.middleware")



router.get("/", (req, res) => {


    res.send("Hello gyus ")


})
router.post("/register", [

    body("email").isEmail().withMessage("Pease enter a valide email"),
    body("password").isLength({ min: 8 }).withMessage("Password must required 8 digit"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("The first name is at least 3 characters")




], userController.registerUser)


router.post("/login", [
    body("email").isLength({ min: 6 }).withMessage("Email must be 5 characters"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 8 characters")

], userController.login)

router.get("/profile", authUser.authUser, userController.userProfile)

router.get("/logout",userController.logOutUser)




module.exports = router;