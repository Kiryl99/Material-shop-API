require("dotenv").config(); 
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");


const authRouter = require("./routes/Auth");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");

const app = express();
const PORT = 3000;


app.use(express.json()); 
app.use(cookieParser());


mongoose.connect("mongodb://127.0.0.1:27017/material-shop")
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.error("Database error:", err));


app.use("/api/Auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});