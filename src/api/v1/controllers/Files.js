// -------------------- Third party libraries and modules --------------------
const fs = require("fs");
const path = require("path");

// -------------------- Controller function to save file to storage --------------------
const SaveFile = async(req , res) => {
    // Access file
    const File = req.file;

    // Check if the exsist or not
    if(!File){
        return res.status(404).json({
            status: false,
            error: {
                message: "There is no any uploaded files!",
            },
        });
    }

    res.status(200).json({
        status:true,
        success:{
            message: "Successfully uploaded the file!",
        },
        fileName: File.filename,
    });
};

// -------------------- Controller function to delete file to storage --------------------
const DeleteFile = async( req , res) => {
    const FilePath = path.join(
        __dirname,
        "../../../../uploads",
        req.params.fileName
    );

    fs.unlink(FilePath, (err) => {
        if(err){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Failed to delete file!"
                }
            });
        }

        res.status(200).json({
            status:true,
            success:{
                message: "Successfully delete the file!"
            },
            fileName: req.params.fileName
        });
    });
};

module.exports = { SaveFile , DeleteFile }