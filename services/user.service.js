const userModel = require("../models/user.model")




module.exports.createUser = async function ({
    firstname, lastname, password, email
}) {


    if (!firstname || !password || !email) {
        throw new Error("All fields must be requried")
    }


    // try {

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        }, email, password
    })






    return user;


}