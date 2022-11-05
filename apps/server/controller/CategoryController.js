const express = require("express");

const router = express.Router();
const Category = require("../models/Category")

router.get("/", async (req, res) => {
    await Category.deleteMany({});

    const category = await Category.insertMany([
        {
            category: "Income"
        },
        {
            category: "Travel",
        },
        {
            category: "Bills"
        },
        {
            category: "Education"
        },
        {
            category: "Entertainment"
        },
        {
            category: "Food"
        },
        {
            category: "Other"
        },
    ]);
    res.json(category);
});

// router.get("/", async (req, res) => {
//     try {
//         const category = await Category.find().exec();
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// });

module.exports = router;