const express = require("express");
const Objectid = require("mongoose").Types.ObjectId;
const route = new express.Router();
const User = require("../models/userschema");

const multer = require("multer");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const sharp=require("sharp");

const upload = multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        console.log("File",file)
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please Upload a Image"));
      }
      cb(undefined, true);
    },
  });

route.get("/users", auth,async (req, res) => {
  user = req.user;
  
  res.json({
    id: user._id,
    email: user.email,
  });
});

route.get("/allUsers",async(req,res)=>{
    const users = await User.find();
    res.status(200).json({
        users
    })
})


route.post("/createuser",upload.single('avatar'),async(req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({width:225,height:225}).jpeg().toBuffer()
    const {email,name,password,gender,dob,position} =req.body
    var avatar = buffer;
    const user = new User({
         email,
         name,
         password,
         avatar,
         dob,
         gender,
         position
    })
    user.save();
    res.status(200).json({
        id: user._id
    })
    //console.log(user._id)

})

route.post("/users/login", async (req, res) => {
  try {
    const user = await User.findUserCredentials(req.body);

    const token = jwt.sign({ id: user._id }, "generate");
    if (!token) throw Error("Couldnt sign the token");
    console.log("token", token);
    res.status(200).json({
      tokenid: token,
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});



route.post("/users/signup", async (req, res) => {
  //console.log(req);
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      throw new Error("Enter all Fields");
    }
    const user = new User(req.body);

    const token = await jwt.sign({ id: user._id }, "generate");

    user.token = token;
    user.save();
    res.status(200).json({
      token,

      id: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

route.post(
  "/users/upload",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    User.findById({ _id: req.user._id }, function (err, doc) {
      doc.avatar = req.file.buffer;
      doc.avatartype = req.file.mimetype;
      doc.save();
    });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = route;
