import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import dbdataservice from '../../Common/Operations';
import { AiFillEdit} from 'react-icons/ai';
import {  MdOutlineDeleteForever} from 'react-icons/md';
import {BsBoxArrowUpRight} from 'react-icons/bs'
import { useDownloadExcel } from 'react-export-table-to-excel';
const Allotment = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setloading] = useState(true)
    
    useEffect(() => {
      getAllRooms();
    }, []);
  
    const getAllRooms = async () => {
        const data = await dbdataservice.getAllRooms();
        setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
          setTimeout(() => {
            setloading(false)
          }, 2000);
    }
  
    const deleteHandler = async (id) => {
      await dbdataservice.deleteRoom(id);
      getAllRooms();
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
                     {rooms.filter((row) =>
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
            {doc.userId}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.contact}
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
  )
}

export default Allotment