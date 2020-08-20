const mongoose = require('mongoose')

const schema = mongoose.Schema;

const Collaborator = new schema({
    taskid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Tasks'
    },
    Collaborator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    IsReaded : {
         type : Number,
         required : true
    }
})

module.exports = Collaborators = mongoose.model('Collaborators',Collaborator)