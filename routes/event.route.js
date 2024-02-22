const express = require("express")
const { eventModel } = require("../models/event.model")
const { userModel } = require("../models/user.model")
const eventRouter = express.Router()


eventRouter.get("/view/:sort", async (req, res) => {
    const sort = req.params.sort
    const location = req.query.location
    if (location) {
        const events = await eventModel.find({ location: location })
        res.send({
            "msg": "all events down below",
            events
        })
    }
    else if (sort == "ascend") {
        const events = await eventModel.find().sort({ date: 1 })
        res.send({
            "msg": "all events down below",
            events
        })
    }
    else if (sort == "descend") {
        const events = await eventModel.find().sort({ date: -1 })
        res.send({
            "msg": "all events down below",
            events
        })
    }
    else {
        const events = await eventModel.find()
        res.send({
            "msg": "all events down below",
            events
        })
    }

})

eventRouter.get("/view", async (req, res) => {
    const location = req.query.location
    if (location) {
        const events = await eventModel.find({ location: location })
        res.send({
            "msg": "all events down below",
            events
        })
    }
    else {
        const events = await eventModel.find()
        res.send({
            "msg": "all events down below",
            events
        })
    }

})

eventRouter.post("/create", async (req, res) => {
    const { userid, title, description, location } = req.body
    let user = await userModel.findOne({ _id: userid })
    const event = new eventModel({
        title,
        description,
        date: new Date(),
        time: new Date().getHours(),
        location,
        organizer: user.email,
        RSVP: []
    })
    await event.save()
    res.send({
        "msg": "event created",
        event
    })
})

eventRouter.patch("/book/:id", async (req, res) => {
    const id = req.params.id
    const { userid } = req.body
    let user = await userModel.findOne({ _id: userid })
    let event = await eventModel.findOne({ _id: id })
    if (event) {
        event.RSVP.push(user.email)
        await eventModel.findByIdAndUpdate(id, event)
        res.send({
            "msg": "event booked",
            event
        })
    }
    else {
        res.send({
            "msg": "event no found"
        })
    }


})

eventRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id
    const data = req.body
    const userid = req.body.userid
    let event = await eventModel.findOne({ _id: id })
    let user = await userModel.findOne({ _id: userid })
    if (event) {
        if (event.organizer == user.email) {
            await eventModel.findByIdAndUpdate(id, data)
            res.send({
                "msg": "updated",
                data
            })
        }
        else {
            res.send({
                "msg": "not authorized"
            })
        }
    }
    else {
        res.send({
            "msg": "event no found"
        })
    }
})

eventRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const userid = req.body.userid
    let user = await userModel.findOne({ _id: userid })
    let event = await eventModel.findOne({ _id: id })
    if (event) {
        if (event.organizer == user.email) {
            await eventModel.findByIdAndDelete(id)
            res.send({
                "msg": "Event Deleted",
                event
            })
        }
        else {
            res.send({
                "msg": "not authorized"
            })
        }

    }
    else {
        res.send({
            "msg": "event not found"
        })
    }
})


module.exports = {
    eventRouter
}