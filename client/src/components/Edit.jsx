import React from 'react'
import NavBar from './Navbar'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Edit = () => {

    const navigate = useNavigate()

    const [update, setUpdate] = useState({
        title: "",
        category: "",
        description: "",
        date: "",
        amount: ""
    })

    console.log(update.title)
    const location = useLocation();
    console.log(location.state.item_id)


    useEffect(() => {
        const itemid = location.state.item_id
        console.log(itemid)
        fetch(`http://localhost:3000/expense/listexpense/expense/${itemid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) =>
                setUpdate(data));
    }, []);

    const setdata = (e) => {
        console.log(e.target)
        const { name, value } = e.target
        setUpdate((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    // fetch('http://localhost:3000/expense/update/6357cb6e9a0503a4c3d403b4',{
    //     method: "PUT",
    //     headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },// send it to express as JSON file
    //     body: JSON.stringify(data)
    // })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));

    const handleSubmit = (e) => {

        e.preventDefault();
        const expenseid = location.state.item_id

        const { title, category, description, date, amount } = update;

        fetch(`http://localhost:3000/expense/update/${expenseid}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },// send it to express as JSON file
            body: JSON.stringify({
                title, category, description, date, amount
            })
        })
            .then((response) => {
                if (response.ok) {
                    // if(confirm("updated")){
                    // navigate("/Homepage")}
                    alert('updated')
                    navigate("/Homepage")
                } else {
                    console.log("Oops Something")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data);
                setUpdate(data)
            });
    }

    return (
        <>
            <NavBar />
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center">
                <div className="bg-white p-12 rounded">
                    <div className="min-h-screen py-96 w-full">
                        <div className="container mx-auto">
                                <div className="">
                                    <h2 className="text-3xl mb-4">New Expense or Income</h2>
                                    <form method="post" onSubmit={handleSubmit} name='google'>

                                        <div className="mt-5">
                                            <label>
                                                title:
                                            </label>
                                            <select name="title" onChange={setdata} value={update.title} className="border border-gray-400 py-1 px-2 w-full">

                                                <option value="Expense">Expense</option>
                                                <option value="Income">Income</option>
                                            </select>
                                        </div>

                                        <div className="mt-5">
                                            <label>
                                                categoty: </label>
                                            <input name="category" type="text" onChange={setdata} value={update.category} className="border border-gray-400 py-1 px-2 w-full"></input>
                                        </div>
                                        <div className="mt-5">
                                            <label>
                                                description: </label>
                                            <input name="description" onChange={setdata} value={update.description} className="border border-gray-400 py-1 px-2 w-full"></input>
                                        </div>

                                        <div className="mt-5">
                                            <label>
                                                date:
                                            </label>
                                            <input name="date" type="date" onChange={setdata} value={update.date} className="border border-gray-400 py-1 px-2 w-full"></input>
                                        </div>


                                        <div className="mt-5">
                                            <label>
                                                amount:
                                            </label>
                                            <input name="amount" type="number" onChange={setdata} value={update.amount} className="border border-gray-400 py-1 px-2 w-full"></input>
                                        </div>


                                        <div className="mt-5">
                                            <button className="w-full bg-purple-500 py-3 text-center text-white">Update</button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
               </div>
               </div>


        </>

    )
}

export default Edit
