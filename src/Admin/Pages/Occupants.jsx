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
const Users = ({  getOccupantId }) => {
 const [loading, setloading] = useState(false);
 const [fullname, setfullname] = useState('');
 const [selectedGender, setSelectedGender] = useState('');
 const [contact, setcontact] = useState('');
 const [institution, setinstitution] = useState('');
 const [pgname, setpgname] = useState('');
 const [pgcontact, setpgcontact] = useState('');
 const [roomno, setroomno] = useState('');
 const [emmail, setemmail] = useState('');
 const [userId, setuserid] = useState('');
 const [allocateddate, setallocateddate] = useState('');
 const [checkoutdate, setcheckoutdate] = useState('');
 const [checkindate, setcheckindate] = useState('');
 const [studentData,setStudentData] = useState([]);
 const [roomData,setRoomData] = useState([]);
 const [selectedStudent, setSelectedStudent] = useState(null);

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     if (selectedStudent) {
       // Update existing room
       await updateDoc(doc(db, 'Occupants', selectedStudent.docId), {
         fullname,
         selectedGender,
         contact,
         institution,
         pgname,
         pgcontact,
         checkindate,
         allocateddate,
         checkoutdate,
         roomno,
         emmail,
         userId,
       });
      Swal.fire({
        icon:'success',
        title:'Successfull',
        showConfirmButton:false,
        timer:3000
      })
       await addDoc(collection(db, 'Alloted'), {
       fullname,
       selectedGender,
       contact,
       checkindate,
       allocateddate,
       checkoutdate,
       roomno,
       createdAt: new Date().toISOString(),
       userId,
       emmail
       });
     } else {
       // Add new room
       await addDoc(collection(db, 'Occupants'), {
        fullname,
        selectedGender,
        contact,
        institution,
        pgname,
        pgcontact,
        checkindate,
        allocateddate,
        checkoutdate,
        roomno,
        createdAt: new Date().toISOString(),
        userId,
        emmail,
       });
       Swal.fire({
        icon:'success',
        title:'Successfull',
        showConfirmButton:false,
        timer:3000
      })
     }
     setSelectedStudent(null);
     setfullname('');
     setSelectedGender('');
     setcontact('');
     setinstitution('');
     setpgname('');
     setpgcontact('');
     setcheckindate('');
     setallocateddate('');
     setcheckoutdate('');
     setroomno('');
     setemmail('');
     setUserId('');

     

   } catch (error) {
     alert(error);
   }
 };

 const handleDelete = async (docId) => {
   try {
     await deleteDoc(doc(db, 'Occupants', docId));
     alert('Deleted successfully');
   } catch (error) {
     alert(error);
   }
 };
 const handleEdit = (student) => {
   setSelectedStudent(student);
   setfullname(student.fullname);
   setSelectedGender(student.selectedGender);
   setcontact(student.contact);
   setinstitution(student.institution);
   setpgname(student.pgname);
   setpgcontact(student.pgcontact);
   setcheckindate(student.checkindate); 
   setroomno(student.roomno);
   setallocateddate(student.allocateddate);
   setcheckoutdate(student.checkoutdate);
   setemmail(student.emmail);
   setUserId(student.userId);

 };

 const fetchData = async () => {
   try {
     const querySnapshot = await getDocs(collection(db, 'Occupants'));
     const data = querySnapshot.docs.map((doc) => ({
       docId: doc.id,
       ...doc.data(),
     }));
     setStudentData(data);
   } catch (error) {
     alert(error);
   }
 };

 useEffect(() => {
   fetchData();
 }, []);

 const getStatus = (roomno) => {
   return roomno ? 'Alloted' : 'Pending';
 };

 const fetchRooms = async () => {
   try {
     const querySnapshot = await getDocs(collection(db, 'Rooms'));
     const data = querySnapshot.docs.map((doc) => ({
       docId: doc.id,
       ...doc.data(),
     }));
     setRoomData(data);
   } catch (error) {
     alert(error);
   }
 };

 useEffect(() => {
   fetchRooms();
 }, []);

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
         <Link className="flex items-center gap-2 " to='/allotment'>
          <span className="text-xl"><FaUsers/></span>
            <button>Allotment</button>
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
          <div>
            <h1 className="text-xl tracking-wider font-bold my-8 text-center">
            Occupant Management
            </h1>
       <div className='mt-9  pt-8 '> 
    

     <form onSubmit={handleSubmit} >
      <h1 className="text-md mx-2 font-semibold my-8">Add/Edit/Allot Occupants</h1>
        <div className='grid md:py-8 w-full md:border md:rounded-lg shadow-md md:p-3  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mx-2 md:my-6 my-4 overflow-x-hidden'>
        <div className='my-3'><Input
         value={fullname}
         onChange={(e)=>setfullname(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Full Name' /></div>
       
         <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Phone Number'
       value={contact}
       onChange={(e)=>setcontact(e.target.value)} /></div>

       <div className='my-3'><Input color='teal' type='text' className='text-black' variant='standard' label='Email'
       value={userId}
       onChange={(e)=>setuserid(e.target.value)} /></div>

      <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Phone Number'
       value={userId}
       onChange={(e)=>setuserid(e.target.value)} /></div>

      <div className='my-3'><Input color='teal' type='text' className='text-black' variant='standard' label='Guardian/Parent Name '
       value={pgname}
       onChange={(e)=>setpgname(e.target.value)}
      /></div>
      
      <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Guardian/Parent Contact' 
       value={pgcontact}
       onChange={(e)=>setpgcontact(e.target.value)}
      /></div>
     
      <div className='my-3'><Input color='teal' type='date' className='text-black' variant='standard' label='Check In' 
       value={checkindate}
       onChange={(e)=>setcheckindate(e.target.value)}
      /></div>
       <div className='my-3'><Input color='teal' type='date' className='text-black' variant='standard' label='Allocation date' 
       value={allocateddate}
       onChange={(e)=>setallocateddate(e.target.value)}
      /></div>
       <div className='my-3'><Input color='teal' type='date' className='text-black' variant='standard' label='Checkout date' 
       value={checkoutdate}
       onChange={(e)=>setcheckoutdate(e.target.value)}
      /></div>
       <div className="">
      <select
          className='text-blue-gray-400 w-full md:mt-[34px] border-b border-b-blue-gray-300 '
             value={roomno}
             onChange={(e) => setroomno(e.target.value)}
             >
     <option className='pt-9' value="">Select School</option>
   {roomData.map((room)=>(
    <option  key={room.docId} value={room.roomno}>{room.roomno}</option>
   ))}
  </select>
          </div>
        </div> 
        <div  className='flex justify-end mr-8'> <button type='submit' className='rounded-md bg-[#8DA2FB] text-gray-900 font-bold px-4 py-2'>Submit </button></div>
      </form>
  <h1 className="text-md ml-2 my-4 font-semibold ">List Of Ocupants</h1>
     {/* <div className="md:flex md:justify-between">
     <div className="mt-6 flex gap-6">
     <Link to='/addoccupant' className='text-sm mx-2 hover:underline hover:font-bold'>Add</Link>
            <button className='text-sm hover:font-bold hover:underline'  onClick={getAllOccupants} > Refresh</button>
            <button className='hover:font-bold mx-2 text-green-700 text-sm hover:underline'  onClick={onDownload} > Export</button>
    </div>
    <div className='w-64 flex justify-end'>
    <Input variant="standard" label="Search..."  color='teal' onChange={(e) => setSearchedVal(e.target.value)} icon={<AiOutlineSearch/>} />
    </div>
     </div> */}

    </div>
    <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table  class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Room Number
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Contact
              </th>
              <th scope="col" class="text-sm  font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" class="text-sm hidden font-medium text-gray-900 px-6 py-4 text-left">
                UserId
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Institution
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                PGname
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                PgContact
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Checkindate
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Allocateddate
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Checkoutdate
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Status
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                CreatedAt
              </th>
              
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Action
              </th>
            </tr>
          </thead>
        
          <tbody>
           {studentData.map((student,index)=>(
            <tr key={student.docId} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.fullname}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.roomno}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {student.selectedGender}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.contact}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {student.emmail}
              </td>
              <td class="text-sm hidden text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.userId}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.institution}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.pgname}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {student.pgcontact}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.checkindate}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.allocateddate}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.checkoutdate}
              </td>
              <td hidden class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.userId}
              </td>
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {getStatus(student.roomno)}
              </td>
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {student.createdAt}
              </td>
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button onClick={() => handleEdit(student) }>Edit</button>
              </td>
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button onClick={() => handleDelete(student.docId)}>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
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