import React from 'react'
import NavBar from './Navbar'
import ChartPie from './ChartPie'
import IncomeVsExpense from './IncomeVsExpense'
import { useLocation } from 'react-router-dom'
import {useState} from 'react'
import Container from './Container'
import PositiveandNegativeChart from './PositiveandNegativeChart'
import ReactLoading from 'react-loading'

const Dashboard = () => {
    return (
        <>
    <div>
      <div>
        <NavBar />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Container />
            {/* <!-- Replace with your content --> */}
            <div className=" flex flex-wrap gap-4 px-4 py-6 sm:px-0">
              <div className=" border-4 border-dashed border-gray-400 rounded-lg h-96 w-2/3">
                <div> <PositiveandNegativeChart /></div>
              </div>
              <div className="border-4 border-dashed border-gray-400 rounded-lg h-96 w-96">
                <div> <IncomeVsExpense /></div>
              </div>
              <div className="border-4 border-dashed border-gray-400 rounded-lg h-96 w-96">
                <div> <ChartPie /></div>
              </div>
              {/* <div className="border-4 border-dashed border-gray-400 rounded-lg h-96 w-2/3">
                <div> <ChartPie /></div>
              </div> */}
            </div>
            {/* <!-- /End replace --> */}
          </div>
        </main>
      </div>
    </div>
    </>
    )
}

export default Dashboard