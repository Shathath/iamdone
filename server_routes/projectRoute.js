const express = require("express");

const route = new express.Router();
const Project = require("../models/projectSchema");

//const multer = require("multer");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

route.post("/createproject", async (req, res) => {
  const { projectTitle } = req.body;
  // console.log(projectTitle);
  const project = new Project({ title: projectTitle });
  console.log(project);
  project
    .save()
    .then((data) => {
      console.log(data);
      res.json({
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
});

module.exports = route;
