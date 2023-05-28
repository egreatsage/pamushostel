import React, { Fragment, useState } from 'react'
import { AiFillFacebook, AiFillYoutube, AiOutlineWhatsApp } from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
  
      <div className="container">
        <div className="row">
          <div className="col-1">
            <h2>Le Pamus </h2>
            <h3>Mixed Hostels for Students</h3>
            <p>Safe Secure Satisfactor</p>

        
            <Link to='/booking'>         
               <button >
                Book Now
             <img className='animate-pulse ' src="https://cdn.pixabay.com/photo/2012/04/11/10/24/arrow-27324__340.png" alt="" /></button>
         </Link>

          </div>
        
          <div className="col-2">
             <img className='bgimage ' src="https://images.unsplash.com/photo-1522079185018-c7dfc98897c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="" />
          <div className="color-box">
          <div className="color-box">
          <div className="color-box">
          </div>
          </div>
          </div>
          <div className="color-box2">
          </div>
          
          </div>
        </div>
        <div className="social-links flex md:gap-4 mb-6">
          <div className='hover:bg-blue-600 text-[blue] hover:text-white border rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><AiFillFacebook/></div>
          <div className='hover:bg-[#212121]  hover:outline-[#B4003A]  hover:text-white border rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><FaTiktok/></div>
          <div className='border text-[red] hover:text-white hover:bg-[red] rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><AiFillYoutube /></div>
          <div className='border text-[green] hover:text-white hover:bg-[green] rounded-full shadow-lg text-2xl p-2 border-gray-300 cursor-pointer'><AiOutlineWhatsApp/></div>
        </div>
      </div>
    </div>
  )
}

export default Home