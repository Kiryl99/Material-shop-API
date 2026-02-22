const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { verifyToken } = require('../middleware');


router.post("/add", verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; 

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity: quantity || 1 }] });
        } else {
            
            cart.items.push({ productId, quantity: quantity || 1 });
        }

        await cart.save();
        res.status(200).send({ message: "Item added to cart", cart });
    } catch (err) {
        res.status(500).send("Error updating cart");
    }
});

module.exports = router;