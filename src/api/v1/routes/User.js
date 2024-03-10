// -----------------------Third-party libraries and modules-----------------------
const express = require("express");

// -----------------------Custom libraries and modules-----------------------
const { RegisterNewUser , LoginUser } = require("../controllers");

// -----------Initialize the router-----------
const router = express.Router();

// -----------Routes-----------
// Register a new user
router.post("/register", RegisterNewUser);

// Login User
router.post("/login" , LoginUser);

module.exports = router;