
import React, { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiOutlineDownload} from 'react-icons/ai';
import {  MdOutlineDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import  dbdataservice from '../../Operations';
import { useDownloadExcel } from 'react-export-table-to-excel';
const Users = ({getUserId}) => {

    const [users, setUsers] = useState([]);
   useEffect(() => {
     getAllUsers();
   }, []);
   const getAllUsers = async () => {
     const data = await dbdataservice.getAllUsers();
     setUsers(data.docs.map((doc) => ({ ...doc.data(),
       id: doc.id })));
   };
   const deleteHandler = async (id) => {
     await dbdataservice.deleteUsers(id);
     getAllUsers();
   };
   const [searchedVal, setSearchedVal] = useState("");
   const tableRef = useRef(null);

 
     const { onDownload } = useDownloadExcel({
         currentTableRef: tableRef.current,
         filename: 'Users List',
         sheet: 'Users List'
     })
  return (
  <div className='overflow-hidden'>
     <div className='overflow-hidden mt-6'>
     <div className="md:flex md:justify-between">
              <div className=" md:pl-8 flex gap-6 mb-3">
      <Link to='/usersadd'><button 
      className='bg-none hover:underline hover:text-blue-600'>Add</button>
       </Link>
      <div className="mb-2">
        <button  className='bg-none hover:underline hover:text-blue-600' onClick={getAllUsers}>
          Refresh 
        </button>
      </div>
      <div className="mb-2 flex gap-3 hover:text-blue-600 hover:underline"> 
<div class="flex justify-center">
  <div>
    <div class="dropdown relative ">
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
    <div className='w-64 flex mb-5'>
     <input className='w-full border px-2 border-blue-gray-300 py-1 rounded-md focus:bg-gray-50' placeholder='Search here...' onChange={(e) => setSearchedVal(e.target.value)}  />
      </div>
              </div>
           <table className='w-full overflow-x-auto'>
          <thead className='border-b'>
                   <tr className=''>
                     <th className='text-sm border-r-gray-500 border'>SNO</th>
                     <th className='text-sm border-r-gray-300 border'>Username</th>
                     <th className='text-sm border-r-gray-300 border'>Email</th>
                     <th className='text-sm border-r-gray-300 border'>Password</th>
                    
                     <th className='text-sm border-r-gray-300 border'>Action</th>
                   </tr>
          </thead>
          {users.filter((row) =>
!searchedVal.length || row.email
.toString()
.toLowerCase()
.includes(searchedVal.toString().toLowerCase()) 
).map((doc,index)=>{
return(
<tbody>
<tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
 <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
 <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
 {doc.username}
 </td>
 <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
 {doc.email}
 </td>
 <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
 {doc.password}
 </td>
 <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-3">
 <Link to='/staffadd'>
<AiFillEdit className='text-[orange] text-2xl cursor-pointer'  onClick={(e) =>
      getUserId(doc.id)}/>
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

  )
}

export default Users