import React from 'react'
import { useState, useEffect } from 'react';

const Container = () => {
    const [stat, setStat] = useState()

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        fetch(`http://localhost:3000/expense/listexpense/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            let res = Object.values(data.reduce((acc, curr) => {
              (acc[curr.title] = acc[curr.title] || { name: curr.title, amount: 0 }).amount += Math.abs(curr.amount);
              return acc;
            }, {}));
            setStat(res[0].amount-res[1].amount)
          });
      }, []);

    return (
        <div className="grid gap-8 space-x-1 lg:grid-cols-6">
            <div className="px-4 py-4 bg-white border-2 border-gray-400 rounded">
            <p className="text-center text-gray-500">Balance</p>
                <h3 className="text-2xl text-center text-gray-800">{stat}</h3>
            </div>
            <div className="px-4 py-4 bg-white border-2 border-gray-400 rounded">
                <h3 className="text-2xl text-center text-gray-800">20</h3>
                <p className="text-center text-gray-500">view</p>
            </div>
            <div className="px-4 py-4 bg-white border-2 border-gray-400 rounded">
                <h3 className="text-2xl text-center text-gray-800">30</h3>
                <p className="text-center text-gray-500">view </p>
            </div>
            <div className="px-4 py-4 bg-white border-2 border-gray-400 rounded">
                <h3 className="text-2xl text-center text-gray-800">40</h3>
                <p className="text-center text-gray-500">view</p>
            </div>
            <div className="px-4 py-4 bg-white border-2 border-gray-400 rounded">
                <h3 className="text-2xl text-center text-gray-800">50</h3>
                <p className="text-center text-gray-500">view</p>
            </div>
            <div className="px-4 py-4 bg-white border-2 border-gray-400 rounded">
                <h3 className="text-2xl text-center text-gray-800">60</h3>
                <p className="text-center text-gray-500">view</p>
            </div>

        </div>
    )
}

export default Container
