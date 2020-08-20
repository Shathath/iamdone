const express = require('express')

const route = new express.Router()
const Meeting = require('../models/MeetingSchema')

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))
route.post('/meeting', (req, res) => {
    //  const {meetingName,meetingTime, meetingDate} = req.body
    const meeting = new Meeting(req.body)
    meeting.save()
    transporter.sendMail({
        to: 'shathathrahman@gmail.com',
        from: 'shathathrahman@ecyber.com',
        subject: 'Message Recieved',
        html: '<h4>Meeting has been scheduled today !</h4>'
    })
    res.send({ meeting })

})

module.exports = route