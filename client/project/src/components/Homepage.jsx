import React from 'react'
import NavBar from './Navbar';

const Homepage = () => {
  return (
    <div>
      <div>
        
        <NavBar /> 
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back insert-name-here!</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* <!-- Replace with your content --> */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <p> Insert overview of monthly spending here </p>
              </div>
            </div>
            {/* <!-- /End replace --> */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Homepage
