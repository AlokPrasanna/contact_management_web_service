// -------------------- Third party Libraries and modules --------------------
const jwt = require("jsonwebtoken");

// -------------------- Custom Libraries and modules --------------------
const Configs = require("../../../configuration/index");

// -------------------- Function to generate the access tokens --------------------
const GenerateAccessTokens = (user) => {
    try {
        // Create the payload
        const Payload = { id:user._id , userType: user.userType};

        // Generate access token
        const accessToken = jwt.sign(Payload , Configs.JWT_ACCESS_KEY, {
            expiresIn:"1m",
        });

        return {status:true , accessToken};

    } catch (error) {
        console.log(error);
        return {status: false , accessToken:null};
    }
}

// -------------------- Function to verify token --------------------
const VerifyTokens = (token) => {
    try {
        const User = jwt.verify(token , Configs.JWT_ACCESS_KEY);
        return {status:true , tokenDetails: User};
    } catch (error) {
       console.log(error);
       return { status: false ,  tokenDetails: null} 
    }
}

module.exports = { GenerateAccessTokens , VerifyTokens };