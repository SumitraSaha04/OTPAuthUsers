const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log("---Error in user.js--", err);
  }
};

module.exports=dbConnect;
