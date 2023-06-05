import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import dbdataservice from '../../Common/Operations';
import { AiFillEdit,AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import {  MdAdminPanelSettings, MdBedroomParent, MdOutlineDeleteForever, MdSpaceDashboard} from 'react-icons/md';
import {BsBoxArrowUpRight} from 'react-icons/bs'
import { useDownloadExcel } from 'react-export-table-to-excel';
import Profile from '../../Common/Profile';
import Loader from '../../client/Components/Loader';
import { Input } from '@material-tailwind/react';
import { TbBrandBooking } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';

const Bookings = ({ getBookingId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setloading] = useState(true)
  
  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
      const data = await dbdataservice.getAllBookings();
      setBookings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        setTimeout(() => {
          setloading(false)
        }, 2000);
  }

  const deleteHandler = async (id) => {
    await dbdataservice.deleteBooking(id);
    getAllBookings();
  };

  const tableRef = useRef(null);
  const [searchedVal, setSearchedVal] = useState("")
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Bookings ',
        sheet: 'Bookings '
    })
    
  return (
  <div>
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
         <Link className="flex items-center gap-2 " to='/adminprofile'>
          <span className="text-xl"><MdAdminPanelSettings/></span>
            <button>Profile</button>
          </Link>
         </div>
        </div>

        </div> 
      </div>
    <div className="main-content">

    <header>
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
          <div className='overflow-y-auto '>
  
  <div className='md:flex md:justify-between overflow-x-hidden mb-10 mt-10'>
      <div className='md:mt-10 w-full '>
      <h1 className=' md:text-xl md:ml-4 text-md font-semibold tracking-wider text-gray-700'>Booking Details</h1>
             <div className='overflow-hidden'>
         <div className="flex justify-between my-3">
        <div className='md:ml-8'>
        <Link to='/addbooking' className='text-md mx-2 hover:underline hover:font-bold'>Add</Link>
          <button className='text-md hover:font-bold hover:underline'  onClick={getAllBookings} > Refresh</button>
          <button className='hover:font-bold mx-2 text-green-700 text-md hover:underline'  onClick={onDownload} > Export</button>
        </div>
        <div>
        <Input variant="standard" label="Search..."  color='teal' onChange={(e) => setSearchedVal(e.target.value)} icon={<AiOutlineSearch/>} />
        </div>
         </div>
         <div className='bg-white w-full mb-8 overflow-x-auto mx-2'>
                <table ref={tableRef} className=''>
                     <thead className='bg-[white] border-b'>
                     <tr className=''>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              SNO
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
            Full Name
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Contact
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Email
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Gender
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Institution
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              RoomType
            </th>
           
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              P/G Name
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              P/G Contact
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Check In
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Allocate
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Edit
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-center">
              Delete
            </th>
            </tr>
                     </thead>
                     {bookings.filter((row) =>
       !searchedVal.length || row.fullname
         .toString()
         .toLowerCase()
         .includes(searchedVal.toString().toLowerCase()) 
       ).map((doc,index)=>{
           return(
        <tbody>
             <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.fullname}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.contact}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.emmail}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {doc.selectedGender}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.institution}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.roomtype}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.pgname}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.pgcontact}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.checkindate}
            </td>
            <td class="text-sm hidden text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.userId}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <Link to='/allocate'>
            <BsBoxArrowUpRight variant="outlined"  onClick={(e) => 
             getBookingId(doc.id)} className='text-xl text-[brown]'
             /></Link>
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <Link to='/addbooking'>
          <AiFillEdit  onClick={(e) =>
                 getBookingId(doc.id)} className='text-xl text-[brown]'/>
          </Link>
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <MdOutlineDeleteForever  onClick={(e) => 
            deleteHandler(doc.id)} className='text-[red] text-2xl cursor-pointer'/>
            </td>
          </tr>
          </tbody>
           )
          })}
          </table>
         </div>
        </div>
      </div>
   </div>
 </div>
</main>
    </div> 
        <label htmlFor="sidebar-toggle" className='body-label'/>
    </div>
}
   
  </div>
  )
}

export default Bookings