const mongoose = require("mongoose"),
  schema = mongoose.Schema;

const projectSchema = new schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = ProjectSchema = mongoose.model("ProjectSchema", projectSchema);
