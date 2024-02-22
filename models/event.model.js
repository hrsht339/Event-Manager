const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: Date,
    location: String,
    organizer: String,
    RSVP: Array
})

const eventModel = mongoose.model("event",eventSchema)

module.exports={
    eventModel
}