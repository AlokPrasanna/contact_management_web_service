// -------------------- Third-party components and modules --------------------
const express = require("express");

// -------------------- Third-party components and modules --------------------
const app = express();

// -------------------- Common middleware --------------------
// -------------------- Base route --------------------

app.get("/" , (req,res) => {
    res.status(200).json({ status: true , message: `Welcome to the Server!` });
});

// -------------------- Error route --------------------
app.use((req , res) => {
    res.status(404).json({ status:false , message: `Not Found!`});
});

// -------------------- Initialize Connection --------------------
app.listen(3000 , () => {
    console.log(`Server is running at 3000 port`);
})


