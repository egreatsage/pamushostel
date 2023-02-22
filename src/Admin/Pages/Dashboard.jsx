import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Components/Nav'
import Messages from './Messages'
import Notices from './Notices'
import Users from './Users'
const Dashboard = () => {
  return (
    <div className='bg-white overflow-y-hidden'>
       <Nav/>
      <div className=''>
             <div>
              <div className="grid md:grid-cols-4 ml-3 mr-3  pb-6 pt-3">
                <div className='shadow-md rounded-md bg-[lavender] md:h-16 md:w-[210px] mb-5 w-full flex h-40 justify-between'>
                   <h1 className='md:my-9 my-16 mx-3'>Bookings</h1>
                   <Link className='mx-1 md:my-9 my-16 ' to='/bookings'>
                    <button className='px-6 bg-gray-100  rounded-md mx-2 '>Open</button>
                   </Link>
                </div>
                <div className='shadow-md rounded-md bg-[lavender] md:h-16 md:w-[210px] mb-5 w-full flex h-40 justify-between'>
                   <h1 className='md:my-9 my-16 mx-3'>Occupants</h1>
                   <Link className='mx-1 md:my-9 my-16 ' to='/occupants'>
                    <button className='px-6 bg-gray-100  rounded-md mx-2 '>Open</button>
                   </Link>
                </div>
                <div className='shadow-md rounded-md bg-[lavender] md:h-16 md:w-[210px] mb-5 w-full flex h-40 justify-between'>
                   <h1 className='md:my-9 my-16 mx-3'>Staff</h1>
                   <Link className='mx-1 md:my-9 my-16 ' to='/staff'>
                    <button className='px-6 bg-gray-100  rounded-md mx-2 '>Open</button>
                   </Link>
                </div>
                <div className='shadow-md rounded-md bg-[lavender] md:h-16 md:w-[210px] mb-5 w-full flex h-40 justify-between'>
                   <h1 className='md:my-9 my-16 mx-3'>Rooms</h1>
                   <Link className='mx-1 md:my-9 my-16 ' to='/rooms'>
                    <button className='px-6 bg-gray-100  rounded-md mx-2 '>Open</button>
                   </Link>
                </div>
                </div>
             </div>
             <div className="grid md:grid-cols-2 gap-4 ml-3 mr-3">
               <div>
               <h1 className='text-center tracking-wider mb-6'>
                Active Users</h1> 
                   <Users/>
               </div>
               <div className='mt-6 md:mt-1'>
               <Messages/>
                <Notices/>
                <div>
                </div>
               </div>
             </div>
     </div>
    </div>
  )
}

export default Dashboard