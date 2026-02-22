const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware'); 


const materials = [
    { id: 1, name: "Iron", price: 0.5, unit: "kg", hazardLevel: "Low" },
    { id: 2, name: "Wood", price: 15.0, unit: "plank", hazardLevel: "Low" },
    { id: 3, name: "Tungsten", price: 40.0, unit: "kg", hazardLevel: "Low" },
    { id: 4, name: "Uranium 238", price: 150.0, unit: "g", hazardLevel: "High" },
    { id: 5, name: "Graphite", price: 2.0, unit: "kg", hazardLevel: "Medium" }
];


router.get('/', (req, res) => {
    res.json(materials);
});


router.get('/:id', verifyToken, (req, res) => {
    const item = materials.find(m => m.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("Material not found");
    res.json(item);
});

module.exports = router;