const captainModel = require("../models/captain.model");






module.exports.createCaptain = async function (firstname, lastname, password, email, color, plate, capacity, vehicleType) {


    if (!firstname || !lastname || !password || !email || !color || !plate || !capacity || !vehicleType) {


        throw new Error("All field must be required")
    }



    const captain = await captainModel.create({
        fullname: {
            firstname, lastname

        }, email, password, vehicle: {  

            color, plate, capacity, vehicleType
        }

    })



    return captain

}