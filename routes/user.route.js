// const CryptoJS = require("crypto-js");
const CRYPT_KEY = 'LovelyDev892_key_001'
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Model
let userSchema = require('../models/User.js')

// CREATE
router.route('/create-user').post((req, res, next) => {
  var reqData = req.body
  console.log("reqData", reqData)
  const { email, userName, password } = reqData
  userSchema.find({ email: email }, (error, data) => {
    if (error) {
      res.json({ success: false, message: "There was an error..." })
    }
    else if (data[0]) {
      console.log("Already existing user.")
      res.json({ success: false, message: "Already existing user." })
    } else {
      userSchema.find({ userName: userName }, (error, data) => {
        if (error) {
          res.json({ success: false, message: "There was an error..." })
        }
        else if (data[0]) {
          console.log("Already existing user.")
          res.json({ success: false, message: "Already existing user." })
        } else {
          var today = new Date()
          var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
          const registeredDateTime = date + ' / ' + time;
          userSchema.create({ ...reqData, registeredDateTime: registeredDateTime }, (error, data) => {
            if (error) {
              res.json({ success: false })
            } else {
              console.log("Added a new user")
              res.json({ success: true, data: data })
            }
          })
        }
      })
    }
  })
})

router.route('/check-user').post((req, res, next) => {
  console.log("check-user", req.body)
  var reqData = req.body
  const { email, password } = reqData;
  console.log("reqData", email, password)
  userSchema.findOne({ email: email }, (error, data) => {
    console.log("data", data)
    if (error) {
      return next(error)
    } else {
      // var decryptedPass = JSON.parse(CryptoJS.AES.decrypt(data.password, CRYPT_KEY).toString(CryptoJS.enc.Utf8));
      if(data?.password === password){
        console.log("res-data", data)
        res.json({ success: true, username : data?.userName})
      }
      else res.json({ success: false, message: "Wrong user email or password." })
    }
  })
})


module.exports = router
