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
const Users = ({  getOccupantId }) => {
  const [occupants, setOccupants] = useState([]);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    getAllOccupants();
  }, []);

  const getAllOccupants = async () => {
    try {
      const data = await dbdataservice.getAllOccupants();
      setOccupants(data.docs.map((doc) => ({ ...doc.data(),
        id: doc.id })));
        setloading(false)
    } catch (err) {
      console.log(err)
  }; 
}
  const deleteHandler = async (id) => {
    await dbdataservice.deleteOccupant(id);
    getAllOccupants();
  };

  const [searchedVal, setSearchedVal] = useState("")
  const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Occupants table',
        sheet: 'Occupants'
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
          <div>
       <div className='mt-9  pt-8 '> 
     <p className='text-xl text-gray-600 mt-8 text-center'>Occupants Details</p>
     <div className="md:flex md:justify-between">
     <div className="mt-6 flex gap-6">
     <Link to='/addoccupant' className='text-sm mx-2 hover:underline hover:font-bold'>Add</Link>
            <button className='text-sm hover:font-bold hover:underline'  onClick={getAllOccupants} > Refresh</button>
            <button className='hover:font-bold mx-2 text-green-700 text-sm hover:underline'  onClick={onDownload} > Export</button>
    </div>
    <div className='w-64 flex justify-end'>
    <Input variant="standard" label="Search..."  color='teal' onChange={(e) => setSearchedVal(e.target.value)} icon={<AiOutlineSearch/>} />
    </div>
     </div>

    </div>
    <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table ref={tableRef} class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Phone
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Institution
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
             
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                PgName
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                PgContact
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Type
              </th> 
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Checkindate
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                RoomNo
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Allocateddate
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Checkoutdate
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Edit
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Delete
              </th>
            </tr>
          </thead>
          {occupants.filter((row) =>
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
              {doc.fullname}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.selectedGender}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {doc.contact}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.institution}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.emmail}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.pgname}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {doc.pgcontact}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.roomtype}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.checkindate}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {doc.roomno}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.allocateddate}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.checkoutdate}
              </td>
              <td hidden class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.userId}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <Link to='/addoccupant'>
            <AiFillEdit className='text-[orange] text-2xl cursor-pointer'  onClick={(e) =>
                   getOccupantId(doc.id)}/>
            </Link>
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <MdOutlineDeleteForever onClick={(e) => 
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

export default Users