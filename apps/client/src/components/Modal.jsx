import React from 'react'

const Modal = () => {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center">
                <div className="bg-white p-12 rounded">
                    
                        <div className="container mx-auto">
                        <h1 class="text-blue-600 text-6xl md:text-3xl xl:text-7xl font-bold tracking-tight mb-12">Account Created</h1>
                        <a class="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Get started</a>
                        </div>
                    
                </div>
            </div>
        </>
    )
}

export default Modal
