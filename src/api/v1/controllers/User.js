// -----------------------Third-party libraries and modules-----------------------
const bcrypt = require("bcrypt");

// -----------------------Custom libraries and modules-----------------------
const { UserModel } = require("../models");

// -----------------------Function to register a new user-----------------------
const RegisterNewUser = async (req, res) => {
  console.log(req.body);
  // Request body
  const {
    fullName,
    emailAddress,
    password,
    phoneNumber,
    imageUrl,
    gender,
    userType,
    dateCreated,
    timeCreated,
    dateUpdated,
    timeUpdated,
  } = req.body;

  try {
    // Check if email address or phone number already available
    const User = await UserModel.findOne({
      $or: [{ emailAddress }, { phoneNumber }],
    });

    if (User) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Email or phone number already exist!",
        },
      });
    }

    // Password encryptions
    const EncryptedPassword = await bcrypt.hash(password, 8);

    // New user
    const NewUser = new UserModel({
      fullName,
      emailAddress,
      password: EncryptedPassword,
      phoneNumber,
      imageUrl,
      gender,
      userType,
      dateCreated,
      timeCreated,
      dateUpdated,
      timeUpdated,
    });

    // Save new user to the database
    const SavedUser = await NewUser.save();

    return res.status(201).json({
      status: true,
      user: SavedUser,
      success: {
        message: "Successfully registered a new user!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to register a new user due to server error!",
      },
    });
  }
};

// -----------------------Function to login user-----------------------
const LoginUser = async(req,res) => {
  // Request body
  const { emailAddress , password} = req.body;

  try {
    // Check email address already exists
    const User = await UserModel.findOne({emailAddress}).exec();
    if(!User){
      return res.status(401).json({
        status:false,
        error:{
          message:" Wrong email address!"
        }
      });
    }

    //  Check enterd passward matches
    const MatchPassword = await bcrypt.compare(password , User.password); 
    if(!MatchPassword){
      return res.status(401).json({
        status: false,
        error:{
          message: "Wrong Password!"
        }
      });
    }   

    return res.status(200).json({
      status: true,
      success:{
        message: "Logging success!"
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status:false,
      error:{
        message: "Failed to Login due to server error!"
      }
    })
  }
}

module.exports = { RegisterNewUser , LoginUser };