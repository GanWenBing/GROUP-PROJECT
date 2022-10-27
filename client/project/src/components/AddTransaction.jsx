import { useState, useContext } from 'react'
import { GlobalContext } from "../context/GlobalState"

const AddTransaction = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [amount, setAmount] = useState(0)
    const { addTransaction } = useContext(GlobalContext)

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 10000),
            title,
            category,
            description,
            date,
            amount: +amount
        }

        addTransaction(newTransaction)
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="title">Text</label>
                    <input
                        type="title"
                        placeholder="Enter text..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <input
                        type="category"
                        placeholder="Enter text..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} />
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
                    <label htmlFor="amount"
                    >Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input
                        type="number"
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button className="btn">Add transaction</button>
            </form>

        </>
    )
}

export default AddTransaction
