var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/Auth");
const { User } = require("../models/User");

//REGISTER
//-----------------

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userData: doc });
  });
});

// LOGIN
// ---------------

router.post("/login", (req, res) => {
  // find user
  //------------
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "auth failed ,email not found",
      });
    // compare password
    // -------------------
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "wrong password" });
      }
    });
    // generate token
    // -----------------
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, user });
    });
  });
});

// Authenticate
// private route

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user.id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
  });
});

//LOGOUT
// private route
//------------

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: " " }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
