import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';

const IncomeList = () => {
  const [list, setList] = useState([])
  const [showmodal, setShowModal] = useState(false)
  // const [title, setTitle] = useState("")
  // const [category, setCategory] = useState("")
  // const [description, setDescription] = useState("")
  // const [date, setDate] = useState("")
  // const [amount, setAmount] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    const id = userinfo.id
    fetch(`http://localhost:3000/expense/listexpense/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setList(data));
  }, []);


  const handleRemove = (id) => () => {

    fetch(`http://localhost:3000/expense/listexpense/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((req) => {
        if (req.ok) {
          setList(list.filter((item) => item._id !== id))
        }
      })
      .then((data) => console.log(data));
  }

  const handleEdit = (id) => () => {
    // setShowModal(!showmodal)
    navigate("/Edit", {state:{item_id:id}})
  }

  const handleOnClose = () => {console.log('hello')
    setShowModal(false)}

  return (
    <>
      <NavBar />
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
              <th scope="col" className="py-3 px-6">
                Edit
              </th>
              <th scope="col" className="py-3 px-6">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                  <td className="py-4 px-6">{item.title}</td>
                  <td className="py-4 px-6">{item.category}</td>
                  <td className="py-4 px-6">{item.description}</td>
                  <td className="py-4 px-6">{item.date}</td>
                  <td className="py-4 px-6">{item.amount}</td>
                  <td className="py-4 px-6"><button onClick={handleEdit(item._id)}>edit</button></td>
                  <td className="py-4 px-6"><button onClick={handleRemove(item._id)}>remove</button></td>

                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      <Calendar onClose={handleOnClose} visible={showmodal}/>
    </>
  )
}

export default IncomeList
