// -----------------------Imports-----------------------
const { 
   RegisterNewUser,
   LoginUser,
   GetAllUsers,
   GetUserById,
   UpdateUser,
   DeleteUser } = require("./User");

const {SaveFile , DeleteFile} = require("./Files");   

// -----------------------Exports-----------------------
module.exports = {
  RegisterNewUser,
  LoginUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  SaveFile,
  DeleteFile,
};