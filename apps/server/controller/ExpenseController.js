const express = require("express");

const router = express.Router();
const Expense = require("../models/Expense")

router.get("/seed", async (req, res) => {
    await Expense.deleteMany({})
    const expense = await Expense.insertMany([
        {
            title: "Expense",
            category: "636a3739f5d4c6c63e9383ce",
            description: "utilise",
            date: "2022-10-31",
            amount: -300,
            user: "636a3d6bfdad84045c77790e"
        },
        {
            title: "Expense",
            category: "636a3739f5d4c6c63e9383cd",
            description: "go to thailand",
            date: "2022-10-31",
            amount: -150,
            user: "636a3d6bfdad84045c77790e"
        },
        {
            title: "Expense",
            category: "636a3739f5d4c6c63e9383cd",
            description: "go to korea",
            date: "2022-10-15",
            amount: -120,
            user: "636a3d6bfdad84045c77790e"
        },
        {
            title: "Income",
            category: "636a3739f5d4c6c63e9383cc",
            description: "payday",
            date: "2022-10-01",
            amount: 3000,
            user: "636a3d6bfdad84045c77790e"
        },
        {
            title: "Expense",
            category: "636a3739f5d4c6c63e9383cf",
            description: "GA",
            date: "2022-10-03",
            amount: -400,
            user: "636a3d6bfdad84045c77790e"
        },
        {
            title: "Expense",
            category: "636a3739f5d4c6c63e9383d0",
            description: "",
            date: "2022-10-09",
            amount: -400,
            user: "636a3d6bfdad84045c77790e"
        },
        {
            title: "Expense",
            category: "636a3739f5d4c6c63e9383d1",
            description: "food",
            date: "2022-10-09",
            amount: -50,
            user: "636a3d6bfdad84045c77790e"
        },
        {
            title: "Expense",
            category: "636a3739f5d4c6c63e9383d2",
            description: "tax",
            date: "2022-10-09",
            amount: -140,
            user: "636a3d6bfdad84045c77790e"
        },

    ]);
    res.json(expense)
});

router.get("/expense/:id", async (req, res) => {
    const {id} = req.params
    try {
        const expense = await Expense.find({user:id}).populate("category").exec();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error);
    }
});



router.get("/listexpense/:id", async (req, res) => {
    const {id} = req.params
    try {
        const expense = await Expense.find({user:id})
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

router.delete("/listexpense/:id", async (req,res) => {
    const {id} = req.params;
    console.log(id)
    try{
        const expense = await Expense.findByIdAndDelete(id);
        if(expense === null){
            res.status(400).json(expense)
        }
        res.status(200).json({msg:"delete"})
    }catch(error){
        res.status(500).json({msg: "error"})
    }
})

router.get("/listexpense/expense/:id", async (req, res) => {
    const {id} = req.params
    try {
        const expense = await Expense.findById(id)
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put("/update/:id", (req,res) => {
    const {id} = req.params;
    Expense.findByIdAndUpdate(id, req.body, (err, updated) =>{
        if (err) {
            res.status(400).json({ error: err.message });
          }
        else{
          res.status(200).json(updated);
        }
    })
})

module.exports = router;