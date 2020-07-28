const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Faust:werkgewoon@mernsoppingapp.ymbxm.gcp.mongodb.net/MernsoppingApp?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(5000);
