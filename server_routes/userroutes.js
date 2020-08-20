const express = require('express');
const Objectid = require('mongoose').Types.ObjectId;
const route = new express.Router();
const User = require('../models/userschema');
const Collaborator = require('../models/Collaborators');
const multer = require('multer');
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')


route.get('/users', auth, async (req, res) => {
   user = req.user

   const _unreadcount = await Collaborator.countDocuments({ $and: [{ Collaborator: Objectid(req.user._id) }, { IsReaded: 1 }] })
   try {
      const updateunreadcount = await User.findByIdAndUpdate({ _id: req.user._id }, { $set: { 'unreadcount': _unreadcount } }, { upsert: true, returnNewDocument: true })

      res.send({ user: updateunreadcount })
   }
   catch (error) {
      console.log(error)
   }



})
route.get('/all/users', async (req, res) => {

   await User.find().select('email').then(user => res.send(user)).catch(error => res.send(error.message))
   //console.log(alluser)

})
route.post('/users/login', async (req, res) => {
   try {
      const user = await User.findUserCredentials(req.body)

      const token = jwt.sign({ id: user._id }, 'welcome')
      if (!token) throw Error('Couldnt sign the token');
      res.status(200).json({


         token,
         user: {
            id: user._id,
            name: user.name,
            email: user.email
         }
      }
      )


   }
   catch (error) {
      res.status(400).json(error.message);
   }




})

const upload = multer({

   limits: {
      fileSize: 1000000
   },
   fileFilter(req, file, cb) {


      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb(new Error("Please Upload a Image"))
      }
      cb(undefined, true)
   }
})
route.post('/users/signup', async (req, res) => {

   try {

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         // res.status(400).send("Please enter all fields")
         throw new Error('Enter all Fields')
      }
      const user = new User(req.body)
      // await user.save()
      const token = await jwt.sign({ id: user._id }, 'welcome')



      user.token = token
      const test = user.save()
      res.status(200).json({
         token,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,

         }
      })
   }
   catch (error) {
      res.status(400).json(error.message)
   }
})

route.post('/users/upload', auth, upload.single('avatar'), async (req, res) => {
   console.log(req.file.buffer)
   console.log(req.file.mimetype);
   User.findById({ _id: req.user._id }, function (err, doc) {
      doc.avatar = req.file.buffer;
      doc.avatartype = req.file.mimetype;
      doc.save()
   })

}, (error, req, res, next) => {
   res.status(400).send({ error: error.message })
})

module.exports = route;
