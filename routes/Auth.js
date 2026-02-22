const express = require('express');
const router = express.Router();
const User = require("../models/User"); 
const { newUserSchema, loginSchema } = require("../schemas");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { error, value } = newUserSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const userExist = await User.findOne({ email: value.email });
        if (userExist) return res.status(400).send("User already exists");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            ...value,
            password: hashedPassword,
            role: req.body.role || "customer"
        });

        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).send("Error during registration");
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send("Invalid email or password");

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.cookie("access_token", token, { 
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
        res.status(200).send({ message: "Logged in", token, role: user.role });
    } catch (err) {
        res.status(500).send("Error during login");
    }
});

module.exports = router;