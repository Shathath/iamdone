const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task_description: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  project: {
    type: String,
    required: true,
  },
  //   users: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //       ref: "Users",
  //     },
  //   ],
  assignee: {
    type: String,
  },
  //   userid: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //     required: true,
  //   },

  //   image: [
  //     {
  //       file: { type: Buffer },
  //       fileName: { type: String },
  //       filetype: { type: String },
  //     },
  //   ],

  label: {
    type: String,
  },

  isCompleted: {
    type: Boolean,
    required: true,
  },
});
//todoSchema.index({ todo_description: "text" });
todoSchema.statics = {
  searchPartial: function (q, callback) {
    return this.find(
      {
        $or: [{ todo_description: new RegExp(q, "gi") }],
      },
      callback
    );
  },

  searchFull: function (q, callback) {
    return this.find(
      {
        $text: { $search: q, $caseSensitive: false },
      },
      callback
    );
  },

  search: function (q, callback) {
    console.log("query text", q);
    this.searchFull(q, (err, data) => {
      if (err) return callback(err, data);
      if (!err && data.length) {
        console.log("full search", data);
        return callback(err, data);
      }
      if (!err && data.length === 0) return this.searchPartial(q, callback);
    });
  },
};

module.exports = Task = mongoose.model("Tasks", todoSchema);
