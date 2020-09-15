const express = require("express");
const route = express.Router();
const Todo = require("../models/todoschema");

route.post("/addtask", async (req, res) => {
    const users = []
    console.log("Hello I'm In add task")
    const {title,tags,raw,assignee,userselected,projectselected} = req.body
    console.log("User Selected",)
    console.log("++++++++++++++++++++++++++")
    console.log("=============================")
    userselected.map((user)=>{
        // console.log("user",user.label)
        users.push(user.value)
    })
    
    const newTodo = new Todo({
         taskdescription: raw,
         taskname:title,
         tags:tags,
         project    : projectselected.value,
         assignee: assignee,
         usersdoing: [...users],
         isCompleted: false

    });
    console.log(newTodo)
    newTodo
    .save()
    .then((data) => res.send(data))
    .catch((error) => res.send(error.message));
});

route.get('/alltasks',async(req,res)=>{
    const tasks = await Todo.find();
    res.status(200).json({
         tasks
    })
})

module.exports = route;
