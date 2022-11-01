import React, { useState } from "react";
import { useEffect } from "react";
import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';


const ChartPie = () => {
    const [data, setData] = useState([])
    
    useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    const id = userinfo.id
    fetch(`http://localhost:3000/expense/listexpense/${id}`)
        .then((response) => response.json())
        .then((data) =>{
            let res = Object.values(data.reduce((acc, curr)=>{
                (acc[curr.category] = acc[curr.category] || {name: curr.category, amount: 0}).amount += curr.amount;
                return acc;
              }, {}));
              setData(res);
              console.log(res)
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
        <Legend layout="vertical" verticalAlign="top" align="top"/>
        <Pie
          data={data}
          cx={170}
          cy={150}
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

// import React from "react";
// import { PieChart, Pie, Sector, Cell } from "recharts";
// import {useEffect, useState} from "react"


// export default function ChartPie() {

//   const [data, setData] = useState([])
//   // const userinfo = JSON.parse(localStorage.getItem("userInfo"))
//     // const id = userinfo.id
//     useEffect(() => {
//       const userinfo = JSON.parse(localStorage.getItem("userInfo"))
//       const id = userinfo.id
//       fetch(`http://localhost:3000/expense/listexpense/${id}`)
//           .then((response) => response.json())
//           .then((data) =>{
//               let res = Object.values(data.reduce((acc, curr)=>{
//                   (acc[curr.category] = acc[curr.category] || {name: curr.category, amount: 0}).amount += curr.amount;
//                   return acc;
//                 }, {}));
//                 setData(res);
//                 console.log(res)
//           });
//       }, []);
  
//       const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
//       const RADIAN = Math.PI / 180;
//       const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//           const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//           const x = cx + radius * Math.cos(-midAngle * RADIAN);
//           const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
//           return (
//               <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//                   {`${(percent * 100).toFixed(0)}%`}
//               </text>
//           );
//       };
//   return (
//     <PieChart width={800} height={400}>
//       <Pie
//         data={data}
//         cx={120}
//         cy={200}
//         innerRadius={60}
//         outerRadius={80}
//         fill="#8884d8"
//         paddingAngle={5}
//         dataKey="amount"
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Pie
//         data={data}
//         cx={420}
//         cy={200}
//         startAngle={180}
//         endAngle={0}
//         innerRadius={60}
//         outerRadius={80}
//         fill="#8884d8"
//         paddingAngle={5}
//         dataKey="amount"
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//     </PieChart>
//   );
// }
