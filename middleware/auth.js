const express = require('express');
const User = require('../models/userschema')
const jwt = require('jsonwebtoken');
const auth = async function (req, res, next) {


  try {
    //console.log(req.get('Authorization'))
    const token = req.get('Authorization').replace('Bearer ', '');
    console.log("my token", token)

    const verifiedID = jwt.verify(token, 'welcome');

    const user = await User.findById({ _id: verifiedID.id });

    if (!user) {
      throw new Error('No user found')
    }

    req.user = user;

    next();
  }
  catch (error) {

    res.status(400).send(error.message)
  }

}

module.exports = auth;