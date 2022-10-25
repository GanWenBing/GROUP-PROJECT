import React from 'react'
import { useNavigate } from 'react-router-dom';

const Income = () => {
    
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data1 = JSON.parse(localStorage.getItem("userInfo"))
        // const obj = {user: data1.id}
        // console.log(obj)

        const data2= Object.fromEntries(new FormData(event.target))
        data2["user"] = data1.id;
        const data = data2;
        console.log(data)

        fetch("http://localhost:3000/expense/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },// send it to express as JSON file
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    navigate("/Homepage")
                } else {
                    console.log("Oops Something")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
            });

    }
    return (
        <form method="post" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Income</legend>
                <label>
                    title:
                    <input name="title" required />
                </label>
                <br />
                <label>
                    category:
                    <input name="category" required />
                </label>
                <br />
                <label>
                    description:
                    <input name="description" required />
                </label>
                <br />
                <label>
                    date:
                    <input name="date" required />
                </label>
                <br />
                <label>
                    amount:
                    <input name="amount" type="number" />
                </label>
                <br />
                {/* <label>
                    category:{" "}
                    <select name="category" id="user-select">
                        <option value="">--Please choose an option--</option>
                        <option value="Meals">Meals</option>
                        <option value="Travel">Travel</option>
                        <option value="Rental">Rental</option>
                        <option value="Tax">Tax</option>
                    </select>
                </label>
                <br /> */}
                <button>Create Expense</button>
            </fieldset>
        </form>
    )
}

export default Income
