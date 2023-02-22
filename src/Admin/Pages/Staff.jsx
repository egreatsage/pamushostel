import { Input } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiOutlineDownload, AiOutlineSearch } from 'react-icons/ai';
import {  MdOutlineDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Nav from '../Components/Nav';
import  dbdataservice from '../../Operations';
import { useDownloadExcel } from 'react-export-table-to-excel';
const Staff = ({getStaffId}) => {
  const [staffs, setStaff] = useState([]);
  useEffect(() => {
    getAllStaff();
  }, []);
  const getAllStaff = async () => {
    const data = await dbdataservice.getAllStaff();
    setStaff(data.docs.map((doc) => ({ ...doc.data(),
      id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await dbdataservice.deleteStaff(id);
    getAllStaff();
  };
  const [searchedVal, setSearchedVal] = useState("");
  const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Staff List',
        sheet: 'Staff List'
    })

  return (
    <div>
        <div><Nav/></div>
        <div className='md:px-10 mb-8'>
    <div className='pt-8 md:pl-8'>
    <p className='text-xl text-gray-600 text-center'>Staff Details</p>
            <div className='overflow-x-auto md:p-8 mt-8 '>
              <div className="md:flex md:justify-between">
              <div className=" md:pl-8 flex gap-6 mb-3">
      <Link to='/staffadd'><button 
      className='bg-white hover:underline hover:text-blue-600'>Add</button>
       </Link>
      <div className="mb-2">
        <button  className='bg-white hover:underline hover:text-blue-600' onClick={getAllStaff}>
          Refresh 
        </button>
  
      </div>
      <div className="mb-2 flex gap-3 hover:text-blue-600 hover:underline">
      
<div class="flex justify-center">
  <div>
    <div class="dropdown relative">
      <button type="button" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
      < AiOutlineDownload className='text-[green] text-xl cursor-pointer '/>
      </button>
      <ul
        class="dropdown-menu min-w-max    hidden bg-white text-base z-50 float-left py-2 list-none  text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none "
        aria-labelledby="dropdown"
      >
        <div><button className='mx-7 my-3' onClick={onDownload}>Excel</button></div>
        <div><button className='mx-7 my-3' >Csv</button></div>
        
        
      </ul>
    </div>
  </div>
</div>
      </div>
    </div>
    <div className='w-64 flex justify-end  '>
    <Input variant="standard" label="Search Here"  color='teal' onChange={(e) => setSearchedVal(e.target.value)} icon={<AiOutlineSearch/>} />
      </div>
              </div>
      <div className='overflow-x-auto md:pl-8'>
      <table ref={tableRef} class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                SNO
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Full Name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                National ID
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Phone Number
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Category
              </th>
              
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Action
              </th>
            </tr>
          </thead>
          {staffs.filter((row) =>
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
              {doc.idee}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.phonenumber}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {doc.category}
              </td>
             
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-3">
              <Link to='/staffadd'>
            <AiFillEdit className='text-[orange] text-2xl cursor-pointer'  onClick={(e) =>
                   getStaffId(doc.id)}/>
            </Link>
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


  )
}

export default Staff