import React from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Profile from '../../Common/Profile'
const Nav = () => {
  return (
    <div>
      <div class="flex space-x-2 my-4">
  <div>
         <div className='flex justify-between'>
          <div>  <AiOutlineMenu
      class="text-black font-bold text-2xl ml-2 cursor-pointer"
      type="button"
      data-te-offcanvas-toggle
      data-te-target="#offcanvasExample"
      aria-controls="offcanvasExample"
      data-te-ripple-init
      data-te-ripple-color="light"
    /></div>
          <div>  <Profile/></div>
       
    
         </div>
   
    <div
      class="invisible fixed bottom-0 left-0 top-0 z-[1045] flex w-84 max-w-full -translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      data-te-offcanvas-init>
      <div class="flex items-center justify-between p-4">
        <h5
          class="mb-0 font-semibold leading-normal"
          id="offcanvasExampleLabel">
          Pamus
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
      <div class="overflow-y-auto">
      <div className='flex'>
            <div className=' overflow-y-auto md:flex-col  w-64 mt-8 p-16 '>
              <Link className='flex hover:bg-gray-700 hover:text-white px-4 hover:rounded-md py-1 my-3 font-semibold tracking-wide' to='/dashboard'><span></span><span>Dashboard</span></Link>
              <Link className='flex hover:bg-gray-700 hover:text-white px-4 hover:rounded-md py-1 my-3 font-semibold tracking-wide' to='/bookings'><span></span><span>Bookings</span></Link>
              <Link className='flex hover:bg-gray-700 hover:text-white px-4 hover:rounded-md py-1 my-3 font-semibold tracking-wide' to='/occupants'><span></span><span>Occupants</span></Link>
              <Link className='flex hover:bg-gray-700 hover:text-white px-4 hover:rounded-md py-1 my-3 font-semibold tracking-wide' to='/'><span></span><span>Users</span></Link>
              
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Nav