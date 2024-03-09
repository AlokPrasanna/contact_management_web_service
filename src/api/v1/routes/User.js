// -----------------------Third-party libraries and modules-----------------------
const express = require("express");

// -----------------------Custom libraries and modules-----------------------
const { RegisterNewUser } = require("../controllers");

// -----------Initialize the router-----------
const router = express.Router();

// -----------Routes-----------
// Register a new user
router.post("/register", RegisterNewUser);

module.exports = router;