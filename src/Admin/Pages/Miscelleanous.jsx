import React, { useState, useEffect, useRef } from 'react'
import {  AiOutlineClose, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import dbdataservice from '../../Common/Operations';
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { MdAdminPanelSettings, MdBedroomParent, MdOutlineDeleteForever, MdSpaceDashboard } from 'react-icons/md';
import { Input} from '@material-tailwind/react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Profile from '../../Common/Profile'
import Loader from '../../client/Components/Loader';
import { TbBrandBooking } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';
import { addDoc, collection, deleteDoc, getDocs, updateDoc ,doc} from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import Swal from 'sweetalert2';
import Rules from './Rules';
import Notices from './Notices';

const Miscelleanous = () => {
    const [loading] = useState(false)
  return (
    <div>
          <div className='mb-4'>
      {loading ?(
         <Loader/>
        ):
      <div>
      <input type='checkbox' name='' id='sidebar-toggle'/>
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-flex">
            <div className="brand-icons flex ">
              <span>Pamus Admin</span>
           
            <label htmlFor='sidebar-toggle' className='md:hidden mt-2 flex ml-14'>
            <span>
              <AiOutlineClose className='cursor-pointer'/>
            </span>
            </label>
            </div>
          </div>
        </div>
        <div className="sidebar-main">
       
        <div className='md:mt-20 mt-8'>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2" to='/dashboard'>
             <span><MdSpaceDashboard className="text-xl"/></span>
            <button>Dashboard</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2" to='/bookings'>
          <span className="text-xl"><TbBrandBooking/></span>
            <button>Bookings</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/occupants'>
          <span className="text-xl"><FaUsers/></span>
            <button>Occupants</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/rooms'>
          <span className="text-xl"><MdBedroomParent/></span>
            <button>Rooms</button>
          </Link>
         </div>
        
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/users'>
          <span className="text-xl"><FaUsers/></span>
            <button>Users</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/miscelleanous'>
          <span className="text-xl"><MdAdminPanelSettings/></span>
            <button>Miscelleanous</button>
          </Link>
         </div>
        </div>

        </div>
        
      </div>
    <div className="main-content">

    <header className='shadow-md'>
           <div className="menu-toggle">
            <label htmlFor='sidebar-toggle'>
            <span>
              <AiOutlineMenu/>
            </span>
            </label>
           </div>
            <div className='header-icons'>
             <Profile/>
            </div>
          </header>
          <main>
         <Rules/>
         <Notices/>
          </main>
      </div> 
        <label htmlFor="sidebar-toggle" className='body-label'/>
    </div>
}
   
  </div>
    </div>
  )
}

export default Miscelleanous