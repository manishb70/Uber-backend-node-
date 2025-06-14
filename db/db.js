const mongoose = require("mongoose");

async function connectToDb() {
    try {
        console.log("Connecting to database");
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to MongoDB successful");

    } catch (error) {
        console.error(" MongoDB connection error:", error.message);
    }
}

module.exports = connectToDb;
