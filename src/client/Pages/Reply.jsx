
import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'
const Reply = () => {
  return (
    <div>
     
    <div className=" border border-gray-500 p-8 mt-44 md:mt-48">
          <h1 className='text-center text-2xl py-8'>Submitted,please wait for a reply from the hostel.Keep Checking your Email</h1>
        <div className="flex justify-center gap-3 ">
         <Link className='underline text-xl' to={'/'}> <button className='bg-none hover:font-semibold underline'>Home</button></Link>
         <Link className='underline text-xl' to={'/studentprofile'}><button className='bg-none hover:font-semibold underline'>Profile</button></Link>
        </div>
    </div>
        
    </div>
  )
}
export default Reply