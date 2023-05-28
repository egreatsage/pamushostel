import React from 'react'
import Navbar from '../Components/Navbar'
import {AiFillPhone} from 'react-icons/ai'
import {HiOutlineMailOpen} from 'react-icons/hi'
import Map from './Map'
const ContactUs = () => {
  return (
    <div>
      <div className='mt-20'>
         <Navbar/>
      </div>
      <div className='grid md:grid-cols-2'>
          <div className="">
          <h2 className='text-center my-8 text-xl font-semibold'>Write Us A Message</h2>
          <form className='mx-2'>
        <input
          type="text"
          id="name"
          name='Name'
          placeholder="Enter Your Name"
          className="mb-6 w-full px-7 py-2 text-md text-gray-700 bg-white border border-gray-500 rounded-[15px] transition ease-in-out"
        />
        <div className="relative mb-6">
          <input
            type='text'
            id="email"
           name='Email'
            placeholder="Enter Your Email"
            className="w-full px-7 py-2 text-md border text-gray-700 bg-white border-gray-500 rounded-[15px] transition ease-in-out"
          />
         
        </div>
        <div className="relative mb-6">
          <textarea
            type='text'
            id="message"
           name='message'
            placeholder="Write Your Message"
            className="w-full px-7 py-9 text-md border text-gray-700 bg-white border-gray-500 rounded-[15px] transition ease-in-out"
          />
        </div>
        <div className='flex justify-end mr-4'>
          <button type='submit' className='outline text-white font-bold outline-white px-8 bg-orange-700 py-1 rounded-md shadow-md '>Send</button>
        </div>
      </form>
      <div className="md:flex gap-4 md:ml-9 ml-5">
          
          <p className='flex my-6 '> <span> <AiFillPhone className='text-orange-600 text-2xl mr-2'/> </span> Phone Number: <span>+254769375210</span></p>
          <p className='flex my-6'> <span><HiOutlineMailOpen className='text-orange-600 text-2xl mr-2'/></span> Email: <span>+pamushostel@gmail.com</span></p>
        </div>
          </div>
          <div className='w-40'>
            <Map/>
          </div>
      </div>
    </div>
  )
}

export default ContactUs