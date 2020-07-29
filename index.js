const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/keys");
const users = require("./Routes/Users");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", users);

// app.get("/api/users/auth", auth, (req, res) => {
//   res.status(200).json({
//     _id: req.user.id,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     lastName: req.user.lastName,
//     role: req.user.role,
//   });
// });

// app.post("/api/users/register", (req, res) => {
//   const user = new User(req.body);

//   user.save((err, doc) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({ success: true, userData: doc });
//   });
// });

// app.post("/api/users/login", (req, res) => {
//   // find user
//   //------------
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (!user)
//       return res.json({
//         loginSuccess: false,
//         message: "auth failed ,email not found",
//       });
//     // compare password
//     // -------------------
//     user.comparePassword(req.body.password, (err, isMatch) => {
//       if (!isMatch) {
//         return res.json({ loginSuccess: false, message: "wrong password" });
//       }
//     });
//     // generate token
//     // -----------------
//     user.generateToken((err, user) => {
//       if (err) return res.status(400).send(err);
//       res
//         .cookie("x_auth", user.token)
//         .status(200)
//         .json({ loginSuccess: true, user });
//     });
//   });
// });

// LOGOUT
//-----------

// app.get("/api/users/logout", auth, (req, res) => {
//   User.findOneAndUpdate(
//     { useFindAndModify: false },
//     { _id: req.user._id },
//     { token: " " },
//     (err, doc) => {
//       if (err) return res.json({ success: false, err });
//       return res.status(200).send({
//         success: true,
//       });
//     }
//   );
// });

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.listen(5000);
