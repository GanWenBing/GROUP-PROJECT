


import React from 'react'
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const PositiveandNegativeChart = () => {
  const [chart, setChart] = useState([])

  function groupByDate(list) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let result = [];

    for (let obj of list) {
      let objDate = new Date(obj.date);
      let monthYear = `${monthNames[objDate.getMonth()]} ${objDate.getFullYear()}`;

      let foundMatch = false;
      let expenseAmount = 0;
      let incomeAmount = 0;
      for (let i = 0; i < result.length; i++) {
        if (result[i].month_year === monthYear) {
          console.log(obj)
          if (obj.title === 'Expense') {
            result[i].expense += -(obj.amount)
          } else if (obj.title === 'Income') {
            result[i].income += obj.amount;
          }
          foundMatch = true;
          break;
        }
      }
      if (!foundMatch) {
        if (obj.title === 'Expense') {
          expenseAmount += -(obj.amount)
        } else if (obj.title === 'Income') {
          incomeAmount += obj.amount
        }
        result.push({
          "month_year": monthYear,
          "expense": expenseAmount,
          "income": incomeAmount,
        });
      }
    }

    return result;
  }

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    const id = userinfo.id
    fetch(`/api/expense/listexpense/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const dateDate = groupByDate(data)
        console.log(dateDate);
        setChart(dateDate)

      });
  }, []);

  return (

    <BarChart
      width={800}
      height={350}
      data={chart}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month_year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="expense" fill="#0088FE" />
      <Bar dataKey="income" fill="#00C49F" />
    </BarChart>

   
  )
}

export default PositiveandNegativeChart
