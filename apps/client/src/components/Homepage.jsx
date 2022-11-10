import React from 'react'
import NavBar from './Navbar'
import expense_picture from '../assets/expense_picture.png'

const Homepage = () => {
  return (
    <>

      <div>

        <NavBar />
        <section className="mb-40 bg-gray-50">
          <div className="text-center  text-gray-800 py-24 px-6">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">TrackIt <br /><span className="text-blue-600">Track Your Expenses </span><br />To Stick To Your Budget</h1>
          </div>
          <div className='hidden sm:block'>
            <img className='max-w-[700px] w-full mx-auto' src={expense_picture} alt="" />
          </div>
        </section>


      </div>

    </>
  )
}

export default Homepage
