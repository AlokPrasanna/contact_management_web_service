// -----------------------Third-party libraries and modules-----------------------
const mongoose = require("mongoose");

// -----------User schema-----------
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: String,
    },
    timeCreated: {
      type: String,
    },
    dateUpdated: {
      type: String,
    },
    timeUpdated: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);