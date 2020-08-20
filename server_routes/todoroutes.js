const express = require("express");
const route = express.Router();
const Todo = require("../models/todoschema");

route.post("/add", async (req, res) => {
  const newTodo = new Todo(...req.body);
  newTodo
    .save()
    .then((data) => res.send(data))
    .catch((error) => res.send(error.message));
});

module.exports = route;
