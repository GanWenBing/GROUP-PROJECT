import React, { useState } from "react";
import { useEffect } from "react";
import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';


const ChartPie = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    const id = userinfo.id
    fetch(`/api/expenses/expense/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const expense = [];
        const income = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].title == 'Expense') {
            expense.push(data[i])
          } else {
            income.push(data[i])
          }
        }
        let res = Object.values(expense.reduce((acc, curr) => {
          (acc[curr.category.category] = acc[curr.category.category] || { name: curr.category.category, amount: 0 }).amount -= curr.amount;
          return acc;
        }, {}));
        setData(res);
      });
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff0000', '#c85196'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text x={cx} y={cy} dy={8} textAnchor="middle">
          Expense Category
          </text>
      </g>

    );
  };

  return (
    <>
      <PieChart width={400} height={400} >
        <Legend layout="vertical" verticalAlign="top" align="top" />
        <Pie
          data={data}
          cx={170}
          cy={100}
          innerRadius={80}
          outerRadius={120}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="amount"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

      </PieChart>
    </>
  )
}
export default ChartPie;

