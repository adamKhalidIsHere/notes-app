const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

module.exports =  connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connect: " + conn.connection.host);
  } catch (error) {
    console.log("Error in connect to MongoDB: " + error.message);
  }
};
