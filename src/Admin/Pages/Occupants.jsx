
import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import dbdataservice from '../../Operations';
import { AiFillEdit, AiOutlineSearch ,AiOutlineDownload} from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Input, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Nav from '../Components/Nav';
import { useDownloadExcel } from 'react-export-table-to-excel';
const Occupants = ({ getOccupantId }) => {
  const [occupants, setOccupants] = useState([]);
  useEffect(() => {
    getAllOccupants();
  }, []);
  const getAllOccupants = async () => {
    const data = await dbdataservice.getAllOccupants();
    
    setOccupants(data.docs.map((doc) => ({ ...doc.data(),
      id: doc.id })));
  };
 
  const deleteHandler = async (id) => {
    await dbdataservice.deleteOccupant(id);
    getAllOccupants();
  };
  const [searchedVal, setSearchedVal] = useState("");
  
  const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })
  return (
    <div>
       <div><Nav/></div>
       <div className='mt-9 md:mx-14 pt-8 px-2'> 
     <p className='text-xl text-gray-600 mt-8 text-center'>Occupants Details</p>
     <div className="md:flex md:justify-between">
     <div className="mt-6 flex gap-6">
      <Link to='/occupantsadd'><button 
      className='bg-white hover:underline hover:text-blue-600' variant='outlined'>Add</button>
       </Link>
      <div className="mb-2">
        <button className='bg-white hover:underline hover:text-blue-600' onClick={getAllOccupants}>
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
          <MenuItem>Csv</MenuItem>
        </MenuList>
       </Menu>
        
      </div>
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
                RoomNo
              </th>
             
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                EntryDate
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ExitDate
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
              {doc.RoomNo}
              </td>
              
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.EntryDate}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.ExitDate}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <Link to='/occupantadd'>
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
  )
}

export default Occupants