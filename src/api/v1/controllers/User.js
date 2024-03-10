// -----------------------Third-party libraries and modules-----------------------
const bcrypt = require("bcrypt");

// -----------------------Custom libraries and modules-----------------------
const { UserModel } = require("../models");
const { GenerateAccessTokens } = require("../libraries");

// -----------------------Function to register a new user-----------------------
const RegisterNewUser = async (req, res) => {
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

    // Generate  Token 
    const { accessToken } = GenerateAccessTokens(User);

    return res.status(200).json({
      status: true,
      accessToken,
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

// -----------------------Function to Get all user-----------------------
const GetAllUsers = async(req,res) => {
  try {
    // Get all users from database
    const AllUsers = await UserModel.find().exec();

    return res.status(200).json({
      status:true,
      users:AllUsers,
      success:{
        message: " Success!"
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status:false,
      users:null,
      success:{
        message: "Failed to get all users due to server error!"
      }
    })
  }
}

// -----------------------Function to Get user by ID -----------------------
const GetUserById = async(req ,res) =>{
  // Get user Id from the url
  const {UserId} = req.params;
  try {
    // Check user Id alredy exsits
    const User = await UserModel.findOne({_id: UserId}).exec();
    
    if(!User){
      return res.status(404).json({
        status: false,
        error:{
          message: "No user found for the provided user id!"
        }
      });
    }

    return res.status(200).json({
      status: true,
      user: User,
      success:{
        message:"User Found Success!"
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status:false,
      error:{
        message: "Failed to find user due to server error!"
      }
    })
  }
}

// -------------------- Function to update user by user Id --------------------
const UpdateUser = async(req , res) => {
  // Get userId from the url
  const {UserId} = req.params;
  try {

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

    // Check user Id already exists
     const User = await UserModel.findOne({_id: UserId}).exec();

     if(!User){
      return res.status(404).json({
        status: false,
        error:{
          message: "No user found for the provided user id!"
        }
      });
     }

     // Update User filed if they are provided
     if(fullName){
      User.fullName = fullName;
     }

     if(emailAddress){
      User.emailAddress = emailAddress;
     }

     if(password){
      // Encrypt password
      const EncryptedPassword = await bcrypt.hash(password , 8);
      User.password = EncryptedPassword;
     }

     if(imageUrl){
      User.imageUrl = imageUrl;
     }

     if(phoneNumber){
      User.phoneNumber = phoneNumber;
     }

     if(gender){
      User.gender = gender;
     }

     if(userType){
      User.userType = userType;
     }

     if(dateUpdated){
      User.dateUpdated = dateUpdated;
     }

     if(dateCreated){
      User.dateCreated = dateCreated;
     }

     if(timeCreated){
      User.timeCreated = timeCreated;
     }

     if(timeUpdated){
      User.timeUpdated = timeUpdated;
     }

     const UpdateUser = await User.save();

     return res.status(200).json({
      status:true,
      user:UpdateUser,
      success:{
        message: " User Update Successfully!"
      }
     })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status:false,
      error:{
        message: "Failed to update user due to server error!"
      }
    })
  }
}

module.exports = { RegisterNewUser , LoginUser , GetAllUsers , GetUserById , UpdateUser };