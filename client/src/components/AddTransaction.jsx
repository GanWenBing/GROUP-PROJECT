import { useState, useContext, useEffect } from 'react'
import { GlobalContext } from "../context/GlobalState"

const AddTransaction = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [amount, setAmount] = useState("")
    const { addTransaction } = useContext(GlobalContext)
    // const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const req = await fetch("http://localhost:3000/categories");
            const data = await req.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);


    const onSubmit = e => {
        e.preventDefault();

        const newTransaction1 = {
            // id: Math.floor(Math.random() * 10000),
            title,
            category,
            description,
            date,
            amount: +amount
        }

        console.log(newTransaction1)

        const data1 = JSON.parse(localStorage.getItem("userInfo"))
        console.log(data1)
        newTransaction1["user"] = data1.id;
        const newTransaction = newTransaction1;
        console.log(newTransaction)


        fetch("http://localhost:3000/expense/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },// send it to express as JSON file
            body: JSON.stringify(newTransaction)
        })
            .then((response) => {
                if (response.ok) {
                    alert('expense created')
                    // setTitle="";
                    // setCategory="";
                    // setAmount="";
                    // setDescription="";
                } else {
                    console.log("Oops something's wrong")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
            });

        addTransaction(newTransaction)

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <select name="title" className="border border-gray-400 py-1 px-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)}>
                    <option value="">--Please choose an option--</option>
                        <option value="Expense" className="border border-gray-400 py-1 px-2 w-full">Expense</option>
                        <option value="Income" className="border border-gray-400 py-1 px-2 w-full">Income</option>
                    </select>
                    {/* <input
                        type="title"
                        placeholder="Enter text..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} /> */}
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <select name="country" className="border border-gray-400 py-1 px-2 w-full" value={category}
                        onChange={(e) => setCategory(e.target.value)} >
                        <option value="">--Please choose an option--</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.category}>
                                {category.category}
                            </option>
                        ))}
                        {/* <input
                        type="category"
                        placeholder="Enter text..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} /> */}
                    </select>
                </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <input
                            type="description"
                            placeholder="Enter text..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="date">Date: </label>
                        <input
                            type="date"
                            placeholder="Enter text..."
                            value={date}
                            onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">
                        Amount (Negative for expenses, positive for income)
                        </label>
                        <br />
                        <input
                            type="number"
                            placeholder="Enter amount..."
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className= "p-1 gap-4 " />
                    </div>
                    <button className="btn">Add transaction</button>
            </form>

        </>
    )
}

export default AddTransaction
