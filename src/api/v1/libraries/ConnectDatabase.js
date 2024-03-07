// -------------------- Third pary libraries and modules --------------------
const mongoose = require("mongoose");

// -------------------- Custom Livraries and modules --------------------
const Config = require("../../../configuration");

// -------------------- Function to initialize the mongo db connection --------------------
const ConnectDatabase = async() => {
 return await mongoose.connect(Config.MONGO_DB_URL);
};

module.exports = {ConnectDatabase};