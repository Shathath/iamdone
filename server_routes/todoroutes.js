const express = require("express");
const route = express.Router();
const Todo = require("../models/todoschema");

route.post("/addtask", async (req, res) => {
    const users = []
    console.log("Hello I'm In add task")
    const {title,tags,editorState,assignee,userselected,projectselected} = req.body
    console.log("User Selected",userselected,projectselected)
    console.log("++++++++++++++++++++++++++")
    console.log("=============================")
    userselected.map((user)=>{
        // console.log("user",user.label)
        users.push(user.value)
    })
    const newTodo = new Todo({
         taskdescription: editorState,
         taskname:title,
         tags:tags,
         projects: projectselected.value,
         assignee: assignee,
         usersdoing: [...users],
         isCompleted: false

    });
    newTodo
    .save()
    .then((data) => res.send(data))
    .catch((error) => res.send(error.message));
});

module.exports = route;
