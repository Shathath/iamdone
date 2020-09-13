// const express = require("express");
// const mongoose = require("mongoose");
// const route = new express.Router();
// const Todo = require("../models/todoschema");
// const User = require("../models/userschema");
// const Project = require("../models/projectschema");
// const Collaborators = require("../models/Collaborators");
// const Meetings = require("../models/MeetingSchema");
// const auth = require("../middleware/auth");

// const ObjectID = mongoose.Types.ObjectId;
// const multer = require("multer");
// route.get("/todos", (req, res) => {
//   Todo.find().then((todo) => {
//     res.send(todo);
//   });
// });
// route.get("/task/:id", auth, async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   const ObjectID = mongoose.Types.ObjectId;
//   const tododetails = await Todo.findOne({ _id: ObjectID(id) }).populate(
//     "users"
//   );

//   console.log(tododetails);
//   res.send({ tododetails });
// });

// route.get("/mytasks", auth, async (req, res) => {
//   try {
//     if (req.query.taskname) {
//       await Todo.search(req.query.taskname, function (err, task) {
//         if (task) {
//           res.send({ task });
//           return;
//         }
//       });
//     } else {
//       try {
//         const ObjectID = mongoose.Types.ObjectId;

//         const task = await Todo.find({
//           $or: [
//             { "collaborators.collaborator": ObjectID(req.user._id) },
//             { userid: ObjectID(req.user._id) },
//           ],
//         }).populate({ path: "users", select: "-_id -password -token" });

//         res.send({ task });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });

// route.post("/add/project", auth, async (req, res) => {
//   const project = new Project({
//     ...req.body,
//     listofTasks: req.body.listofTasks,
//   });
//   project
//     .save()
//     .then((data) => {
//       console.log(data);
//       return res.send(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// route.get("/notifications", auth, async (req, res) => {
//   const notifications = await Collaborators.find({
//     $and: [{ Collaborator: ObjectID(req.user._id) }, { IsReaded: 1 }],
//   })
//     .populate("taskid")
//     .exec();

//   res.send(notifications);
// });

// const upload = multer({
//   fileFilter(req, file, cb) {
//     if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
//       throw new Error("Please attach correct file");
//     }
//     cb(undefined, true);
//   },
// });

// route.post("/add/todo", auth, upload.array("avatar", 10), async (req, res) => {
//   try {
//     var reqFiles = {};
//     var images = [];

//     for (let i = 0; i < req.files.length; i++) {
//       reqFiles["file"] = req.files[i].buffer;
//       reqFiles["fileName"] = req.files[i].fileName;
//       reqFiles["filetype"] = req.files[i].mimetype;
//       images.push(reqFiles);
//     }

//     const user = await User.findById(req.user._id);
//     const { name } = user;
//     var { todo_description, title, collaborators } = req.body;

//     if (!todo_description) throw new Error("Please Describe your task");

//     if (!title) throw new Error("Please Add title for your task");

//     if (!collaborators)
//       throw new Error("Please Add Collaborators for your task");

//     var objlist = [];

//     let collaborators_list = req.body.collaborators.split(",");
//     const ObjectID = mongoose.Types.ObjectId;

//     for (let key in collaborators_list) {
//       objlist.push(ObjectID(collaborators_list[key]));
//       console.log(objlist);
//     }

//     const todo = new Todo({
//       title: req.body.title,
//       todo_description: req.body.todo_description,
//       collaborator: objlist,
//       users: objlist,
//       priority: req.body.priority ? req.body.priority : "Low",
//       duedate: req.body.duedate,
//       image: reqFiles,
//       status: "In Progress",
//       userid: req.user._id,
//       assignee: name,
//     });

//     todo.save().then((todo) => {
//       try {
//         const ObjectID = mongoose.Types.ObjectId;
//         let collaborator = req.body.collaborators.split(",");
//         console.log("collaborators", collaborator);
//         for (let key in collaborator) {
//           const Collabos = new Collaborators({
//             taskid: todo._id,
//             Collaborator: ObjectID(collaborator[key]),
//             IsReaded: 1,
//           });
//           Collabos.save();
//         }
//       } catch (error) {
//         console.log(error);
//       }
//       res.send(todo);
//     });
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// });

// route.post("/meetings", (req, res) => {});
// module.exports = route;
