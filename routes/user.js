const express = require("express")
const router = express.Router()
const UserModel = require("../models/User")


const {users} = require("../data")
const { verifyToken } = require("../middleware")

router.get("/", verifyToken, (req,res) => {

    console.log("/Users request includes the users details:",req.user)
    return res.send(users)

})

model.exports = router
