require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI_ATLAS);
        console.log('MongoDB Atlas Connected:', conn.connection.host);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testConnection();