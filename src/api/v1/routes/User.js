// -----------------------Third-party libraries and modules-----------------------
const express = require("express");

// -----------------------Custom libraries and modules-----------------------
const { RegisterNewUser , LoginUser , GetAllUsers , GetUserById  , UpdateUser} = require("../controllers");
const {AuthenticateUser} = require("../middleware");

// -----------Initialize the router-----------
const router = express.Router();

// -----------Routes-----------
// Register a new user
router.post("/register", RegisterNewUser);

// Login User
router.post("/login" , LoginUser);

// Get All Users
router.get("/all" ,AuthenticateUser, GetAllUsers);

// Get user by Id
router.get("/one/:UserId" ,GetUserById);

// Update user
router.put("/update/:UserId" , UpdateUser);

module.exports = router;