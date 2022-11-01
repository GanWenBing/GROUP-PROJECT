import NavBar from "./Navbar";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyIbhBPY43ZVcD8_D5Z-nLZo8cjbTLKZ8tr40R-9Ua-QMJxvk0NkHzq5VFIGp0QZQnj_Q/exec'
        const form = document.forms['google']

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
              .then(response => alert("updated！！！"))
              .catch(error => console.error('Error!', error.message))

        
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
        <>
            <NavBar />

            <div className="min-h-screen py-10">
                <div className="container mx-auto">
                    <div className=" lg:flex-row w-full lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div className="">
                            <h2 className="text-3xl mb-4">New Expense or Income</h2>
                            <form method="post" onSubmit={handleSubmit} name='google'>
                                
                                    <div className="mt-5">
                                        <label>
                                            title:
                                        </label>
                                        <select name="title" className="border border-gray-400 py-1 px-2 w-full">
                                           
                                            <option value="Expense">Expense</option>
                                            <option value="Income">Income</option>
                                        </select>
                                    </div>
                               
                                <div className="mt-5">
                                    <label>
                                        categoty: </label>
                                    <input name="category" type="text" className="border border-gray-400 py-1 px-2 w-full"></input>
                                </div>
                                <div className="mt-5">
                                    <label>
                                        description: </label>
                                    <input name="description" className="border border-gray-400 py-1 px-2 w-full"></input>
                                </div>

                                <div className="mt-5">
                                    <label>
                                        date:
                                    </label>
                                    <input name="date" type="date" className="border border-gray-400 py-1 px-2 w-full"></input>
                                </div>


                                <div className="mt-5">
                                    <label>
                                        amount:
                                    </label>
                                    <input name="amount" type="number" className="border border-gray-400 py-1 px-2 w-full"></input>
                                </div>


                                <div className="mt-5">
                                    <button className="w-full bg-purple-500 py-3 text-center text-white">Add Expense</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
            

        </>
    )
}

export default Settings