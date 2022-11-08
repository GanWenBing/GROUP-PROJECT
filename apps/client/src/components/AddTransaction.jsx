import { useState, useEffect } from 'react'

const AddTransaction = ({ onAddTransaction }) => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [amount, setAmount] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            const req = await fetch("/api/categories");
            const data = await req.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        const { id: userId } = JSON.parse(localStorage.getItem("userInfo"))
        const newTransaction = {
            user: userId,
            title,
            category,
            description,
            date,
            amount: +amount
        }

        console.log(newTransaction)


        fetch("/api/expense/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTransaction)
        })
            .then((response) => {
                if (response.ok) {
                    onAddTransaction();
                    setTitle("")
                    setCategory("")
                    setDescription("")
                    setDate("")
                    setAmount("")
                } else {
                    console.error("Oops something's wrong")
                }
            })

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
                    
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <select name="category" className="border border-gray-400 py-1 px-2 w-full" value={category}
                        onChange={(e) => setCategory(e.target.value)} >
                        <option value="">--Please choose an option--</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.category}
                            </option>
                        ))}
                       
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
                        className="p-1 gap-4 " />
                </div>
                <button className="btn">Add transaction</button>
            </form>

        </>
    )
}

export default AddTransaction