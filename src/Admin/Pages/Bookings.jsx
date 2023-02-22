
import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import dbdataservice from '../../Operations';
import { AiFillEdit, AiOutlineDownload, AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Input, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Nav from '../Components/Nav';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useReactToPrint } from 'react-to-print';
const Bookings = ({ getBookingId }) => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getAllBookings();
  }, []);
  const getAllBookings = async () => {
    const data = await dbdataservice.getAllBookings();
    setBookings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await dbdataservice.deleteBooking(id);
    getAllBookings();
  };
  const [searchedVal, setSearchedVal] = useState("");
  const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Booking List',
        sheet: 'Booking List'
    })
    const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
  return (
    <div>
       <div><Nav/></div>
       <div className='md:px-10 px-2 mb-5 mt-9 pt-9 overflow-x-hidden '>
      
      <div className='pt-8'>
                 <p className='font-bold mb-3 text-xl  pb-2  text-center'> Booking Details</p>
               <div className="md:flex md:justify-between gap-3">
               <div className=" md:pl-9 flex gap-6">
      <Link to='/bookingsadd'>Add</Link>
      <div className="mb-2">
        <button 
         className='bg-white hover:underline hover:text-blue-600'
          onClick={getAllBookings}>
          Refresh
        </button>
      </div>
      <div className="mb-2 flex gap-3 hover:text-blue-600 hover:underline">
       <Menu>
        <MenuHandler>
         < AiOutlineDownload className='text-[green] text-xl cursor-pointer '/>
        </MenuHandler>
        <MenuList>
          <MenuItem><button onClick={onDownload}>Excel</button></MenuItem>
          <MenuItem><button onClick={handlePrint}>Excel</button></MenuItem>
        </MenuList>
       </Menu>
        
      </div>
    </div>
    <div className='w-64 flex justify-end'>
    <Input variant="standard" label="Search by First Name"  color='teal' onChange={(e) => setSearchedVal(e.target.value)} icon={<AiOutlineSearch/>} />
    </div>
               </div>
            <div ref={componentRef} className='overflow-x-auto md:p-8  '>
            <table ref={tableRef} class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                SNO
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                FName
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                SName
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Age
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Contact
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                HomeCounty
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                H.Category
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                P/G Name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                P/G Contact
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                EName
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                EContact
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ERelation
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Institution
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                YearOfStudy
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                UserId
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Allocation
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Edit
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Delete
              </th>
            </tr>
          </thead>
          {bookings.filter((row) =>
         !searchedVal.length || row.FName
           .toString()
           .toLowerCase()
           .includes(searchedVal.toString().toLowerCase()) 
         ).map((doc,index)=>{
             return(
          <tbody>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.FName}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.LName}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.Gender}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {doc.Age}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.PNumber}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.Homecounty}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.Category}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.PGName}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.PGContact}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.EName}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.EContact}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.Relation}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.Institution}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.YearOfStudy}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.userId}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <Link to='/bookingsallocate'>
              <BsBoxArrowUpRight variant="outlined"  onClick={(e) => 
               getBookingId(doc.id)} className='text-xl text-[brown]'
               /></Link>
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <Link to='/BookingsAdd'>
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
   
  )
}

export default Bookings