const router = require("express").Router();
const User = require("../../moduls/Auth");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      address: req.body.address,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) {
      return res.status(400).json("Wrong credentials");
    }

    const validated = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!validated) {
      return res.status(400).json("Wrong credentials");
    }

    // Only send the user data if the credentials are correct
    res.status(200).json(foundUser);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/otp-manager", async (req, res) => {
  console.log(req.body);
  const _otp = Math.floor(100000 + Math.random() * 900000);
  console.log(_otp);
  let user = await User.findOne({ email: req.body.email });
  // send to user mail
  if (!user) {
    res.send({ code: 500, message: "user not found" });
  }

 // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: 'vernie.mosciski@ethereal.email',
      pass: 'CFmjTGBVTW3XfHSvaN',
    },
  });

  let info = await transporter.sendMail({
    from: "atharvingale408@gmail.com",
    to: req.body.email, // list of receivers
    subject: "OTP", // Subject line
    text: String(_otp),
    html: `<html>
          < body >
          Hello and welcome
      </ >
     </html > `,
  });

  if (info.messageId) {
    console.log(info, 84);
    User.updateOne({ email: req.body.email }, { otp: _otp })
      .then((result) => {
        res.send({ code: 200, message: "otp send" });
      })
      .catch((err) => {
        res.send({ code: 500, message: "Server err" });
      });
  } else {
    res.send({ code: 500, message: "Server err" });
  }
});



router.post("/verificatio-otp", async (req, res) => {
    try {
      const user = await User.findOne({ otp: req.body.otp });
  
      if (!user) {
        return res.status(400).json({ code: 400, message: "OTP is invalid" });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Update the user's password with the hashed password
      await User.updateOne({ email: user.email }, { password: hashedPassword });
  
      res.status(200).json({ code: 200, message: "Password updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
  });
  

module.exports = router;
