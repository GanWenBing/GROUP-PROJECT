import React from 'react'
import { useState, useEffect } from 'react';

const Container = () => {
    const [stat, setStat] = useState()
    const [expense, setExpense] = useState()
    const [income, setIncome] = useState()

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        fetch(`/api/expenses/listexpense/${id}`)
            .then((response) => response.json())
            .then((data) => {
                let res = Object.values(data.reduce((acc, curr) => {
                    (acc[curr.title] = acc[curr.title] || { name: curr.title, amount: 0 }).amount += Math.abs(curr.amount);
                    return acc;
                }, {}));
                if (res[0].name === 'Expense') {
                    setStat(res[1].amount - res[0].amount)
                    setExpense(res[0].amount)
                    setIncome(res[1].amount)
                } else {
                    setStat(res[0].amount - res[1].amount)
                    setExpense(res[1].amount)
                    setIncome(res[0].amount)
                }
            });
    }, []);

    return (
        <div className="grid gap-8 space-x-1 lg:grid-cols-6">
            <div className="px-4 py-4 bg-cyan-100 border-2 border-gray-400 rounded">
                <p className="text-center text-gray-500">Balance</p>
                <h3 className="text-2xl text-center text-gray-800">{stat}</h3>
            </div>
            <div className="px-4 py-4 bg-red-100 border-2 border-gray-400 rounded">
                <p className="text-center text-gray-500">Expense</p>
                <h3 className="text-2xl text-center text-gray-800">{expense}</h3>
            </div>
            <div className="px-4 py-4 bg-green-100 border-2 border-gray-400 rounded">
                <p className="text-center text-gray-500">Income</p>
                <h3 className="text-2xl text-center text-gray-800">{income}</h3>
            </div>
        </div>
    )
}

export default Container
