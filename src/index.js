// -------------------- Third-party components and modules --------------------
const express = require("express");
require("dotenv/config");

// -------------------- Custom libraries and modules --------------------
const Configs = require("./configuration");
const { ConnectDatabase} = require("./api/v1/libraries") ;
const { UserRoutes , FileRoutes} = require("./api/v1/routes");

// -------------------- Third-party components and modules --------------------
const app = express();
const PORT = Configs.PORT || 3308;

// -------------------- Common middleware --------------------

// -----------Accept json-----------
app.use(express.json());


// ---------- Allow access uploads folder ----------
app.use("/uploads" , express.static("./uploads/"));

// ---------- Allow access downloads folder ----------
app.use("/download" , express.static("./downloads/"));


// -------------------- Base route --------------------

app.get("/" , (req,res) => {
    res.status(200).json({ status: true , message: `Welcome to the Server!` });
});

// -----------User route-----------
app.use("/api/users", UserRoutes);

// -----------File route-----------
app.use("/api/files", FileRoutes);

// -------------------- Error route --------------------
app.use((req , res) => {
    res.status(404).json({ status:false , message: `Not Found!`});
});

// -------------------- Initialize Connection --------------------
app.listen(PORT , () => {
    console.log(`Server is running at ${PORT} port`);
    ConnectDatabase().then(() => console.log("Connected to Database!")).catch((err) => onslotchange.log(err));
});


