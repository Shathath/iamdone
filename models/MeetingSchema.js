const mongoose = require('mongoose');
const schema = mongoose.Schema;

const meetingSchema = new schema({
    meetingName: {
        type: String,
        required: true,
    },
    meetingDate: {
        type: Date,
        required: true
    },
    meetingTime: {
        type: String,
        required: true
    }
})

module.exports = Meetings = mongoose.model('Meetings', meetingSchema)