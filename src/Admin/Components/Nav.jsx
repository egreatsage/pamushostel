import React from 'react'
import { MdBedroomChild, MdOutlineAdminPanelSettings, MdPeopleOutline } from 'react-icons/md'
import {FcTodoList} from 'react-icons/fc'
import {ImProfile} from 'react-icons/im'
import {BiHotel, BiMenu} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import {TbBrandBooking} from 'react-icons/tb'
const Nav = () => {
  return (
    <div>
      <div class="flex space-x-2">
  <div>
 
    <BiMenu  
      className='bg-none outline-none pl-5 pt-5 text-5xl cursor-pointer'
      data-te-offcanvas-toggle
      data-te-target="#offcanvasExample"
      aria-controls="offcanvasExample"
      data-te-ripple-init
      data-te-ripple-color="light"  />
  
   
    <div
      class="invisible fixed bottom-0 top-0 left-0 z-[1045] flex w-96 max-w-full -translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      data-te-offcanvas-init>
      <div class="flex items-center justify-between p-4">
        <h5
          class="mb-0 font-semibold leading-normal"
          id="offcanvasExampleLabel">
          Offcanvas
        </h5>
        <button
          type="button"
          class="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-offcanvas-dismiss>
          <span
            class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
      <div class="flex-grow overflow-y-auto p-4">
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
    </div>
  )
}

export default Nav