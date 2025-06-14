const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Minimum 3 characters are required"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name at least 3 characters required"]
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [6, "Email must be 6 digit required"]
    }, password: {
        type: String,
        required: true,
        minlength: [8, "Minimum 8 digit required for the password"],
        select:false
    }, status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    socketId: {
        type: String
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Colot must be 3 digit required"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate minimum 3 digit required "]
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "1 Capacity minimum required"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"]
        }
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }



})


captainSchema.methods.genreateAuthToken = async function () {

    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token;
}



captainSchema.statics.hashPassword = async function (password) {

    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword


}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}



const captainModel = mongoose.model("captainModel", captainSchema)

module.exports = captainModel;