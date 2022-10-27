import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
<<<<<<< HEAD
import NavBar from "./Navbar";

const IncomeList = () => {
  const [list, setList] = useState([])
  // const [title, setTitle] = useState("")
  // const [category, setCategory] = useState("")
  // const [description, setDescription] = useState("")
  // const [date, setDate] = useState("")
  // const [amount, setAmount] = useState("")

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    const id = userinfo.id
    fetch(`http://localhost:3000/expense/listexpense/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setList(data));
  }, []);
  return (
    <>
      <NavBar />
      <h1>TrackIt</h1>
      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Title
              </th>
              <th scope="col" class="py-3 px-6">
                Category
              </th>
              <th scope="col" class="py-3 px-6">
                Description
              </th>
              <th scope="col" class="py-3 px-6">
                Date
              </th>
              <th scope="col" class="py-3 px-6">
                Amount
              </th>
              <th scope="col" class="py-3 px-6">
                Edit
              </th>
              <th scope="col" class="py-3 px-6">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                  <td class="py-4 px-6">{item.title}</td>
                  <td class="py-4 px-6">{item.category}</td>
                  <td class="py-4 px-6">{item.description}</td>
                  <td class="py-4 px-6">{item.date}</td>
                  <td class="py-4 px-6">{item.amount}</td>
                  <td class="py-4 px-6"><button>edit</button></td>
                  <td class="py-4 px-6"><button>remove</button></td>

                </tr>
              )
            })}

          </tbody>

          {/* <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="py-4 px-6">
                    Sliver
                </td>
                <td class="py-4 px-6">
                    Laptop
                </td>
                <td class="py-4 px-6">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">
                    White
                </td>
                <td class="py-4 px-6">
                    Laptop PC
                </td>
                <td class="py-4 px-6">
                    $1999
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="py-4 px-6">
                    Black
                </td>
                <td class="py-4 px-6">
                    Accessories
                </td>
                <td class="py-4 px-6">
                    $99
                </td>
            </tr>
        </tbody> */}
        </table>
      </div>
    </>
=======

const IncomeList = () => {
    const [income, setIncome] = useState([])

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        fetch(`http://localhost:3000/expense/listexpense/${id}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
      }, []);
  return (
    <div>
      
    </div>
>>>>>>> bce4fda5830c0397e999fc8a1a55a722f6ef5cb7
  )
}

export default IncomeList
