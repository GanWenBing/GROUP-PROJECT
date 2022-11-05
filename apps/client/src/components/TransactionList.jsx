import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const TransactionList = ({
  shouldFetch,
  setShouldFetch
}) => {
  const [transactions, setTransactions] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [newTitle, setNewTitle] = useState(null)
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState(null)
  const [newAmount, setNewAmount] = useState(null)
  const [newDescription, setNewDescription] = useState(null)
  const [newDate, setNewDate] = useState(null)

  
  useEffect(() => {
    const fetchCategories = async () => {
        const req = await fetch("http://localhost:3000/categories");
        const data = await req.json();
        console.log(data)
        setCategories(data);
    };
    fetchCategories();
}, []);

  useEffect(() => {
    if (shouldFetch) {
      const userinfo = JSON.parse(localStorage.getItem("userInfo"))
      const id = userinfo.id
      fetch(`http://localhost:3000/expense/expense/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setTransactions(data);
          setShouldFetch(false);
        });
    }
  }, [shouldFetch]);


  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/expense/listexpense/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      },
      // body: JSON.stringify(transaction)
    })
      // const json = await response.json()
      .then((response) => {
        if (response.ok) {
          setShouldFetch(true)
        } else {
          console.error(response)
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
      });

  }

  const handleSave = (e) => {
    e.preventDefault();
    
    const id = editItem._id;
    const {title, category, amount, description, date} = editItem
    fetch(`http://localhost:3000/expense/update/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        category,
        amount,
        description,
        date
      })
    })
      .then((response) => {
        if (response.ok) {
          setShouldFetch(true)
          setEditItem(null)
        } else {
          console.error(response)
        }
      })
      .then((data) => {
        setEditItem(data)
      });
   
  }

  const setdata = (e) => {
    console.log(e.target)
    const { name, value } = e.target
    setEditItem((preval) => {
        return {
            ...preval,
            [name]: value
        }
    })
}

  return (
    <>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-gray-800 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-800">
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
            {transactions.map((item) => {
              return (
                <tr className="bg-white border-b dark:bg-white-800 dark:border-gray-100" key={item._id}>
                  <td className="py-4 px-6">{item.title}</td>
                  <td className="py-4 px-6">{item.category?.category}</td>
                  <td className="py-4 px-6">{item.description}</td>
                  <td className="py-4 px-6">{item.date}</td>
                  <td className="py-4 px-6">{item.amount}</td>
                  <td className="py-4 px-6 text-gray-1500 hover:text-black">
                    <button onClick={() => setEditItem(item)}>
                      edit
                    </button>
                    {editItem &&
                      <div id="authentication-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setEditItem(null)}>
                              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                            <div className="py-6 px-6 lg:px-8">
                              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit</h3>
                              <form className="space-y-6" action="#">
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                  {/* <input name="title" id="title" placeholder={editItem.title} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" /> */}
                                  <select name="title" placeholder={editItem.title} value={editItem.title} onChange={setdata}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" id="title" >
                                  <option value="">--Please choose an option--</option>
                                    <option value="Expense">Expense</option>
                                    <option value="Income">Income</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Category</label>
                                  {/* <input name="category" id="category" placeholder={editItem.category} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" /> */}
                                  <select name="category" placeholder={editItem.category} value={editItem.category?.category} onChange={setdata}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >
                                  <option value="">--Please choose an option--</option>
                                    {categories.map((category) => (
                                      <option key={category._id} value={category._id}>
                                        {category.category}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
                                  <input name="amount" id="amount" placeholder={editItem.amount} value={editItem.amount} onChange={setdata} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                                  <input name="description" id="description" placeholder={editItem.description} value={editItem.description} onChange={setdata} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
                                  <input name="date" type="date" placeholder={editItem.date} value={editItem.date} onChange={setdata} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                </div>
                                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSave}>Save</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </td>
                  <td className="py-4 px-6 text-gray-1000 hover:text-black"><button onClick={() => handleDelete(item._id)}> remove </button> </td>

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
