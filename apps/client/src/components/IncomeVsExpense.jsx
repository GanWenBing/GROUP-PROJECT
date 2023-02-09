import React from 'react'
import { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';

const IncomeVsExpense = () => {

  const [data, setData] = useState([])

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
        setData(res);
      });
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
          Total
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
          cx={180}
          cy={150}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
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

export default IncomeVsExpense
