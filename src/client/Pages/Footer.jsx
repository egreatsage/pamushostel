import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import {FaFacebookF, FaTiktok} from 'react-icons/fa'
export default function Footer() {
  return (
   <div className='border-b border-t border border-gray-400 border-r-none py-4'>
    <div className='flex justify-center '>
       <div className="flex gap-6 text-xl">
        <a href="https://facebook.com"><FaFacebookF/></a>
        <a href="https://twitter.com"> <AiOutlineTwitter/></a>
        <a href="https://twitter.com">  <AiFillInstagram/></a>
        <a href="https://tiktok.com">  <FaTiktok/></a>
       </div> 
   </div>
   <h1 className='text-center my-3'>© 2023 Copyright: Le Pamus Residency</h1>
   </div>
  )
}
