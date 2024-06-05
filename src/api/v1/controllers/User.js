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

  // Request body
  const {
    newPassword,
    currentPassword,
    dateUpdated,
    timeUpdated,
  } = req.body;

  // Global Variables
  let UpdateUser , EncryptedPassword ;

  try {

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

     // propeties validation
     if(!dateUpdated || !timeUpdated){
      return res.status(400).json({
        status: false,
        error:{
          message: "Not provided updated date or time information!"
        }
      });
     }

     if(currentPassword && newPassword){
      const PropetiesCount = Object.keys(req.body).length;
      if(PropetiesCount != 4){
        return res.status(400).json({
          status: false,
          error:{
            message: "Invalid number of propeties for password update!"
          }
        });
      }

     // check current password maches or not

     const PasswordMatch = await bcrypt.compare(currentPassword , User.password);

     if(!PasswordMatch){
      return res.status(400).json({
          status: false,
          error:{
            message: "Worng current password!"
          }
      });
     }

     // Encrypt password
     EncryptedPassword = await bcrypt.hash(newPassword , 8);
    } else if( !currentPassword && newPassword){
      return res.status(400).json({
          status: false,
          error:{
            message: "Missing current password!"
          }
      });
    }else if( !newPassword && currentPassword){
      return res.status(400).json({
          status: false,
          error:{
            message: "Missing new password!"
          }
      });
    }

     // Update User 
    UpdateUser = await UserModel.findOneAndUpdate(
      {_id:UserId},
      {
        $set:
          currentPassword && newPassword ? {
            password: EncryptedPassword,
            dateUpdated,
            timeUpdated,
          }
          : req.body,
      },
      {
        new:true
      }
    )

     return res.status(200).json({
      status:true,
      user:UpdateUser,
      success:{
        message: currentPassword && newPassword ? "Password Update Successfully!" : "User Details Update Successfully!"
      }
     });
     
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status:false,
      error:{
        message: "Failed to update user due to server error!"
      }
    });
  }
}

// -------------------- Function to delete user --------------------
const DeleteUser = async(req , res) =>{
  // Get userId from the url
  const {UserId} = req.params;

  try {
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

     const DeleteUser =  await User.deleteOne(); 
     if(DeleteUser){
      return res.status(200).json({
        status: true,
        success: {
          message: "Delete user successfully!"
        }
      });
     }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status:false,
      error:{
        message: "Failed to delete user due to server error!"
      }
    });    
  }
}

module.exports = { RegisterNewUser , LoginUser , GetAllUsers , GetUserById , UpdateUser , DeleteUser };