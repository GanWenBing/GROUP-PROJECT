import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from "./Navbar";

const TransactionList = () => {
  const [list, setList] = useState([])

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
      <h1>TrackIt</h1>
      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead class="text-xs text-gray-800 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-800">
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
                <tr class="bg-white border-b dark:bg-white-800 dark:border-gray-100" key={item._id}>
                  <td class="py-4 px-6">{item.title}</td>
                  <td class="py-4 px-6">{item.category}</td>
                  <td class="py-4 px-6">{item.description}</td>
                  <td class="py-4 px-6">{item.date}</td>
                  <td class="py-4 px-6">{item.amount}</td>
                  <td class="py-4 px-6 text-gray-1500 hover:text-black"><button>edit</button></td>
                  <td class="py-4 px-6 text-gray-1000 hover:text-black"><button>remove</button></td>

                </tr>
              )
            })}

          </tbody>

        </table>
      </div>
    </>
  )
}

export default TransactionList







// import { GlobalContext } from "../context/GlobalState"
// import { useContext } from "react"
// import Transaction from "./Transaction"

// const TransactionList = () => {
//     const { transactions } = useContext(GlobalContext)


//     return (
//         <>
//             <h3>History</h3>
//             <ul className="list">
//                 {transactions.map(transaction => (<Transaction key={transaction.id} transaction = { transaction } />))}

//             </ul>

//         </>
//     )
// }

// export default TransactionList
