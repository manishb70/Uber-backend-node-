const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")
dotenv.config();

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




userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
};  




userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);

}

userSchema.statics.hashPassword = async function (password) {

    return await bcrypt.hash(password, 10);


}


const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
