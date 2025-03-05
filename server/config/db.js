const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Using database:", mongoose.connection.name);
        console.log(`MongoDB Connected`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process if there's an error
    }
};

// Export the connectdb function
module.exports = { connectdb };