const express = require("express");

const router = express.Router();
const Expense = require("../models/Expense")

router.get("/seed", async (req, res) => {
    await Expense.deleteMany({})
    const expense = await Expense.insertMany([
        {
            title: "abc",
            category: "abc",
            description: "abc",
            date: "abc",
            amount: 123,
            user: "6352a527e8ac3c50bbad8b62"
        },
        {
            title: "abc",
            category: "abc",
            description: "abc",
            date: "abc",
            amount: 123,
            user: "6352a527e8ac3c50bbad8b62"
        },

    ]);
    res.json(expense)
});

router.get("/", async (req, res) => {
    try {
        const expense = await Expense.find().exec().populate("category");
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error);
    }
});



router.get("/listexpense/:id", async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.find({ user: id })
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error });
    }
});


router.post("/create", async (req, res) => {
    console.log(req.body)
    console.log(req)
    const { title, category, description, date, amount, user } = req.body;
    try {
        await Expense.create(

            {
                title,
                category,
                description,
                date,
                amount,
                user
            }
        );
        res.status(200).json({ msg: 'ok' })
    } catch (error) {
        res.status(401).json('error')
    }

});

router.delete("/listexpense/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const expense = await Expense.findByIdAndDelete(id);
        if (expense === null) {
            res.status(400).json(expense)
        }
        res.status(200).json({ msg: "delete" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, category, description, date, amount } = req.body;
     
    try {
        const updatedTransaction = await Expense.findByIdAndUpdate(id, {
            title, 
            category, 
            description, 
            date, 
            amount
        }, 
        {new: true}
        );
        res.json(updatedTransaction)
    } catch (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(200).json(updated);
        }
    }
            
})

module.exports = router;