import React, { useEffect, useState } from 'react';
import {

  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import { Input, Option, Select } from '@material-tailwind/react';
import { useUserAuth } from '../../Common/UserAuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings, MdBedroomParent, MdSpaceDashboard } from 'react-icons/md';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Loader from '../../client/Components/Loader';
import { TbBrandBooking } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';
import Profile from '../../Common/Profile';
const Rooms = () => {
  const [roomno, setRoomNo] = useState('');
  const [gender, setGender] = useState('');
  const [roomData, setRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setloading] = useState(false);
  const [allotments, setAllotments] = useState([]); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedRoom) {
        // Update existing room
        await updateDoc(doc(db, 'Rooms', selectedRoom.docId), {
          roomno,
          gender,
        });
        Swal.fire({
          icon:'success',
          title: 'Room Updated Successfully',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        // Add new room
        await addDoc(collection(db, 'Rooms'), {
          roomno,
          gender,
          createdAt: new Date().toISOString(),
        });
        Swal.fire({
          icon:'success',
          title: 'Room Added Successfully',
          showConfirmButton: false,
          timer: 2000
        })
      }
      setSelectedRoom(null);
      setRoomNo('');
      setGender('');
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, 'Rooms', docId));
      Swal.fire({
        icon:'success',
        title: 'Room Deleted Successfully',
        showConfirmButton: false,
        timer: 2000
      })
      
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setRoomNo(room.roomno);
    setGender(room.gender);
  };

  const fetchData = async () => {
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
    fetchData();
  }, []);

  const getStatus = (roomno) => {
    return roomno ? 'Allocated' : 'Pending';
  };

  const fetchOccupants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Alloted'));
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setAllotments(data);
    } catch (error) {
      alert(error);
    }
  };
  
  useEffect(() => {
    fetchOccupants();
  }, []);
  return (
  <div>
   
     <div className="flex justify-end w-8">
   
     </div>

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
          <div className=''>
          <div>
            <h1 className='tracking-wider text-xl font-bold text-center mb-8 mt-8'>Room Management</h1>
      <form onSubmit={handleSubmit} >
      <h1 className='text-start font-semibold text-md pl-4 my-4'>Add/Edit/Allot Room Details</h1>
        <div className='grid md:py-8 w-full md:border md:rounded-lg shadow-md md:p-3  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mx-2 md:my-6 my-4 overflow-x-hidden'>
        <div className='my-3'><Input
         value={roomno}
         onChange={(e)=>setRoomNo(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Room Number' /></div>
       
         <div className='my-3'><Input color='teal' type='text' className='text-black' variant='standard' label='Gender'
       value={gender}
       onChange={(e)=>setGender(e.target.value)} /></div>
      
        </div> 
        <div  className='flex justify-end mr-8'> <button type='submit' className='rounded-md bg-[#8DA2FB] text-white font-bold px-4 py-2'>Submit </button></div>
      </form>

        <div className='grid md:grid-cols-2 gap-4'>
       
        <div className='md:border-r'>
        <h1 className='text-start font-semibold text-md pl-4 my-4 divide-y-2'>List of Rooms</h1>
        <div class="flex flex-col overflow-x-auto">
           
           <div class="sm:-mx-6 lg:-mx-8">
             <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
               <div class="overflow-x-auto">
                 <table class="min-w-full text-left text-sm font-light">
                   <thead class="border-b font-medium dark:border-neutral-500">
                     <tr>
                       <th  class="px-6 py-4">#</th>
                       <th  class="px-6 py-4">Room No</th>
                       <th  class="px-6 py-4">Gender</th>
                       {/* <th  class="px-6 py-4">Status</th> */}
                       <th  class="px-6 py-4 hidden">createdAt</th>
                       <th  class="px-6 py-4">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                      {roomData.map((room,index) => (
                     <tr key={room.docId} class="border-b dark:border-neutral-500">
                       <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                       <td class="whitespace-nowrap px-6 py-4">{room.roomno}</td>
                       <td class="whitespace-nowrap px-6 py-4">{room.gender}</td>
                       {/* <td class={`whitespace-nowrap px-6 py-4 ${room.roomno ? ' text-green-800 font-extrabold text-md' : ' text-md text-red-900 font-extrabold'}`}>
                        {getStatus(room.roomno)}
                       </td> */}
                       <td class="whitespace-nowrap px-6 py-4 hidden">{room.createdAt}</td>
                       <td class="px-1 mx-1 "> <button className='px-1 mx-1 text-green-700 font-bold' onClick={() => handleEdit(room) }>Edit</button></td>
                       <td class="px-1 mx-1 "><button className='px-1 mx-1 text-red-700 font-bold' onClick={() => handleDelete(room.docId)}>
                               Delete
                             </button>
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
      
<div>
<h1 className='text-start font-semibold text-md pl-4 my-4'>  Room Occupant Information</h1>
<div>
               <div class="flex flex-col overflow-x-auto">
           
           <div class="sm:-mx-6 lg:-mx-8">
             <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
               <div class="overflow-x-auto">
                 <table class="min-w-full text-left text-sm font-light">
                   <thead class="border-b font-medium dark:border-neutral-500">
                     <tr>
                       <th  class="px-6 py-4">#</th>
                       <th  class="px-6 py-4">Name</th>
                       <th  class="px-6 py-4">Room</th>
                       <th  class="px-6 py-4 ">Contact</th>
                     </tr>
                   </thead>
                   <tbody>
                      {allotments.map((allotment,index) => (
                     <tr key={allotment.docId} class="border-b dark:border-neutral-500">
                       <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                       <td class="whitespace-nowrap px-6 py-4">{allotment.fullname}</td>
                       <td class="whitespace-nowrap px-6 py-4">{allotment.roomno}</td>
                       <td class="whitespace-nowrap px-6 py-4">{allotment.contact}</td>
                     </tr>
                      ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         </div>
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

export default Rooms