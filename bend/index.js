const express = require("express");
const app = express();
const mongoose = require("mongoose");
const orderRoute = require("./api/orders/Order");
const productsRoute = require("./api/products/Product");
const authRoute = require("./api/auth/Auth");
const Razorpay = require("razorpay");
const inventory = require("./api/inventory/Inventory")

// const ProfileRoute = require("./routes/profile")
// const multer = require ("multer")
// const path = require("path");

const cors = require("cors");

app.use(express.json());
app.use(cors());
//app.use("/images",express.static(path.join(__dirname,"/images")))

var razorpay = new Razorpay({
  key_id: "rzp_test_JMOHVUIOeN1tU1",
  key_secret: "SjRrUeP9wHtpXfxKrH89I0U3",
});

mongoose
  .connect("mongodb://127.0.0.1:27017/pizza", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Backend Is Running....");
    });
  })
  .catch((err) => console.log(err));

//   const storage = multer.diskStorage({
//     destination: (req,file, cb) => {
//     cb(null, "images");
//     },
//     filename: (req,file,cb) =>{
//     cb(null,req.body.name);
//     },
//     });

//     const upload = multer({ storage: storage });
//    app.post("/api/upload", upload.single("file"), (req, res) => {
//     res.status(200).json("File has been uploaded");
//      });



app.use("/api/orders", orderRoute);
app.use("/api/products", productsRoute);
app.use("/api/auth",authRoute);
app.use("/api/inventory",inventory)

app.use("/", (req, res) => {
  console.log("hey this is atharv from backend");
});
