const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: "String",
            required: true,
            minlength: [3, 'First name must be at least 3 characters']
        },
        lastname: {
            type: "String",
            required: false,
            minlength: [3, 'last name must be at least 3 characters']
        }
    },
    email: {
        type: "String",
        required: true,
        unique: true,
        minlength: [6, "Email must be 6 characters required"]
    }, password: {
        type: "String",
        required: true,
        select: false
    }, socketId: {
        type: "String"
    }
})




userSchema.methods.genereateAuthToken = function () {

    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token
}






userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this._id);

}

userSchema.methods.hashPassword = async function (password) {

    return await bcrypt.hash(password, 10);


}


const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
