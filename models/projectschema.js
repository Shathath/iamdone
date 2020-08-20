const mongoose = require('mongoose'),
    schema = mongoose.Schema

const projectSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    listofTasks: [
        {

            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Tasks'

        }
    ],
    leadby: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    projectmanager: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    deadline: {
        type: Date
    }

})

module.exports = ProjectSchema = mongoose.model('ProjectSchema', projectSchema)