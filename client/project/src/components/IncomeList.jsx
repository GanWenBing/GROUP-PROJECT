import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

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
  )
}

export default IncomeList
