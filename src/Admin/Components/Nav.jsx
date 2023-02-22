import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings,MdPeopleOutline,MdBedroomChild } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {TbBrandBooking} from 'react-icons/tb'
import {BiHotel} from "react-icons/bi"
import {FcTodoList} from 'react-icons/fc'
import {ImProfile} from 'react-icons/im'
import Profile from '../../Common/Profile'
const Nav = () => {
  return (
    <div className='mt-5  flex justify-between'>
<div className="flex ml-5 space-x-2">
  <div>
   <AiOutlineMenu className='cursor-pointer text-2xl' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"/>
    <div className="offcanvas offcanvas-start fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding outline-none transition duration-300 ease-in-out text-gray-700 top-0 left-0 border-none w-96"  id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header flex items-center justify-between p-4">
        <h5 className="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasExampleLabel">Pamus</h5>
        <button type="button" className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body overflow-y-auto mt-16 ml-16">
      <div>
        <div className='flex gap-6 hover:bg-gray-100 rounded-md mr-16 my-5'><MdOutlineAdminPanelSettings className='text-2xl my-[3px] ml-2'/><Link className='my-[3px]' to='/dashboard'>Dashboard</Link></div>
        <div className='flex gap-6 hover:bg-gray-100 rounded-md mr-16 my-5'><TbBrandBooking className='text-2xl my-[3px] ml-2'/><Link className='my-[3px]' to='/bookings'>Bookings</Link></div>
        <div className='flex gap-6 hover:bg-gray-100 rounded-md mr-16 my-5'><BiHotel className='text-2xl my-[3px] ml-2'/><Link className='my-[3px]' to='/occupants'>Occupants</Link></div>
        <div className='flex gap-6 hover:bg-gray-100 rounded-md mr-16 my-5'><MdPeopleOutline className='text-2xl my-[3px] ml-2'/><Link className='my-[3px]' to='/staff'>Staff</Link></div>
        <div className='flex gap-6 hover:bg-gray-100 rounded-md mr-16 my-5'><MdBedroomChild className='text-2xl my-[3px] ml-2'/><Link className='my-[3px]' to='/rooms'>Rooms</Link></div>
        <div className='flex gap-6 hover:bg-gray-100 rounded-md mr-16 my-6'><FcTodoList className='text-2xl my-[3px] ml-2'/><Link className='my-[3px]' to='/reminders'>My ToDo</Link></div>
        <div className='flex gap-6 hover:bg-gray-100 rounded-md mr-16 my-5'><ImProfile className='text-2xl my-[3px] ml-2'/><Link className='my-[3px]' to='/myprofile'>My Profile</Link></div>
      </div>
      </div>
    </div>
  </div>
</div>
<div>
  <p className='text-2xl bold tracking-wider leading-tight'>Pamus Admin Panel</p>
</div>
<div className='mr-2'>
   <Profile/>
</div>
    </div>
  )
}

export default Nav