let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()

//  Model
let connectionSchema = require('../models/Connection.js')

// await classSchema.find().populate({ path: 'studies' })
// CREATE 
router.route('/create-connection').post((req, res, next) => {
    const { connection } = req.body
    console.log("create-connection", req.body)
    connectionSchema.find({
        connection: connection
    }, (error, data) => {
        if (error) {
            res.json({ success: false })
        }
        else if (data[0]) {
            // console.log(data[0])
            console.log("Already existing pattern")
            res.json({ success: false })
        } else {
            var today = new Date()
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const commentDateTime = date + ' / ' + time;
            connectionSchema.create({...req.body, commentDateTime:commentDateTime }, (error, data) => {
                if (error) {
                    res.json({ success: false })
                } else {
                    console.log("Added a new pattern..")
                    res.json({ success: true })
                }
            })
        }
    })
})

// READ 
router.route('/all-connections').get(async (req, res) => {
    // const tempConnections = await connectionSchema.find().populate({ path: 'users' })
    const tempConnections = await connectionSchema.find()
    return res.status(200).json(tempConnections)
})

// CREATE 
router.route('/update-connection').post((req, res, next) => {
    const { connectionId, connection } = req.body
    console.log("update-connection", req.body)
    connectionSchema.find({
        connection: connection
    }, (error, data) => {
        if (error) {
            res.json({ success: false })
        }
        else if (data[0]) {
            // console.log(data[0])
            console.log("Already existing pattern")
            res.json({ success: false })
        } else {
            var today = new Date()
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const commentDateTime = date + ' / ' + time;
            connectionSchema.findByIdAndUpdate(connectionId, {$set: {...req.body, commentDateTime:commentDateTime }}, (error, data) => {
                if (error) {
                    res.json({ success: false })
                } else {
                    console.log("Added a new pattern..")
                    res.json({ success: true })
                }
            })
        }
    })
})

router.route('/delete-connection/:id').delete((req, res, next) => {
    connectionSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            res.json({ success: false })
        } else {
            res.json({ success: true })
        }
    })
})


module.exports = router
