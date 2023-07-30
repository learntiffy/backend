const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

const spinup = require("./utils/spinup");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");

const app = express();
app.use(bodyParser.json({ limit: '3mb' }));
app.use(multer().single("file"));
app.use(cors());

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

app.use("/authe", authRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json("Internal Server Error");
});

spinup.start();
mongoose
  .connect("mongodb+srv://tiffy:tiffy@cluster0.7oso9te.mongodb.net/tiffy")
  .then((result) => {
    console.log("Connected!!!");
    app.listen(process.env.PORT || 9999);
  })
  .catch((err) => console.log(err));
