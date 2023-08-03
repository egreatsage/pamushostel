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
import { Input} from '@material-tailwind/react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings, MdBedroomParent, MdSpaceDashboard } from 'react-icons/md';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Loader from '../../client/Components/Loader';
import { TbBrandBooking } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';
import Profile from '../../Common/Profile';
const Bookings = () => {
  const [fullname, setfullname] = useState('');
  const [contact, setcontact] = useState('');
  const [institution, setinstitution] = useState('');
  const [pgname, setpgname] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [pgcontact, setpgcontact] = useState('');
  const [userId, setuserid] = useState('');
  const [emmail, setemmail] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [statusToggle, setStatusToggle] = useState(false);
  const [studentData,setStudentData] = useState([]);
  const [roomData,setRoomData] = useState([]);
  const [schoolData,setSchoolData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setloading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudent) {
        // Update existing room
        await updateDoc(doc(db, 'Bookings', selectedStudent.docId), {
          fullname,
          selectedGender,
          contact,
          institution,
          pgname,
          pgcontact,
          checkindate,
          emmail,
          userId,
        });
        Swal.fire({
          icon:'success',
          title:'Updated successfully',
          showConfirmButton: false,
          timer:2000
        })
        await addDoc(collection(db, 'Occupants'), {
          fullname,
          selectedGender,
          contact,
          institution,
          pgname,
          pgcontact,
          checkindate,
          emmail,
          userId,
          createdAt: new Date().toISOString(),
        });
      } else {
        // Add new room
        await addDoc(collection(db, 'Bookings'), {
         fullname,
          selectedGender,
          contact,
          institution,
          pgname,
          pgcontact,
          checkindate,
          emmail,
          userId,
          createdAt: new Date().toISOString(),
        });
       Swal.fire({
          icon:'success',
          title:'added successfully',
          showConfirmButton: false,
          timer:2000
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
      setuserid('');
      setemmail('');
    
    } catch (error) {
      alert(error);
    }
  };
  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, 'Bookings', docId));
     Swal.fire({
          icon:'success',
          title:'deleted successfully',
          showConfirmButton: false,
          timer:2000
        })
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
    setuserid(student.userId);
    setemmail(student.emmail);
    
  };
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Bookings'));
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setStudentData(data);
      setloading(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatus = (roomno) => {
    return roomno ? 'Approved' : 'Pending';
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
  const fetchSchools = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Universities'));
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setSchoolData(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  
  const toggleStatus = () => {
    setStatusToggle((prevStatusToggle) => !prevStatusToggle);
  };
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
         <Link className="flex items-center gap-2 " to='/miscelleanous'>
          <span className="text-xl"><MdAdminPanelSettings/></span>
            <button>Miscellenous</button>
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
            <h1 className="text-xl text-center tracking-wider my-8">Booking Management</h1>
          <div>
      <form onSubmit={handleSubmit} >
      <h1 className="text-md mx-2 font-semibold my-4">Add/Edit Booking Details</h1>
        <div className='grid md:py-8 w-full md:border  md:rounded-lg shadow-md md:p-3  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mx-2 md:my-6 my-4 overflow-x-hidden'>
        <div className='my-3'><Input
         value={fullname}
         onChange={(e)=>setfullname(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Full Name' /></div>
        <div className='my-3'>    
        <select
          className='text-blue-gray-400 w-full md:mt-[21px] border-b bg-none border-b-blue-gray-300 '
             value={institution}
             onChange={(e) => setinstitution(e.target.value)}
             >
     <option className='pt-9' value="">Select School</option>
   {schoolData.map((school)=>(
    <option  key={school.docId} value={school.Uname}>{school.Uname}</option>
   ))}
  </select>
  </div>
         <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Phone Number'
       value={contact}
       onChange={(e)=>setcontact(e.target.value)} /></div>

       <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Email'
       value={emmail}
       onChange={(e)=>setemmail(e.target.value)} /></div>

       <div className='my-3'><Input color='teal' type='text' className='text-black' variant='standard' label='UserId'
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
       <div className="">
          </div>
        </div> 
        <div  className='flex justify-end mr-8'> <button type='submit' className='rounded-md bg-[#8DA2FB] text-white font-bold px-4 py-2'>Submit </button></div>
      </form>
            <div className='border my-6'></div>
        <div>
      <h1 className="text-md font-semibold mx-2 my-4 ">List Of Bookings</h1>
          <div class="flex flex-col overflow-x-auto mb-10">
  <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th  class="px-6 py-4">#</th>
              <th  class="px-6 py-4">Name</th>
              <th  class="px-6 py-4">Gender</th>
              <th  class="px-6 py-4">Contact</th>
              <th  class="px-6 py-4">Email</th>
              <th  class="px-6 py-4">Institution</th>
              <th  class="px-6 py-4">PgName</th>
              <th  class="px-6 py-4">PgContact</th>
              <th  class="px-6 py-4">Checkindate</th>
              <th  class="px-6 py-4">bookingdate</th>
              <th  class="px-6 py-4 hidden">UserId</th>
              <th  class="px-6 py-4">Status</th>
              <th  class="px-6 py-4">Approve</th>
          
              <th  class="px-6 py-4">Delete</th>
            </tr>
          </thead>
          <tbody>
             {studentData.map((student,index) => (
            <tr key={student.docId} class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
              <td class="whitespace-nowrap px-6 py-4">{student.fullname}</td>
              <td class="whitespace-nowrap px-6 py-4">{student.selectedGender}</td>
              <td class="whitespace-nowrap px-6 py-4 underline text-blue-700"> <a
            href={`tel:${student.contact}`}
          >
            {student.contact  }</a></td>
              <td class="whitespace-nowrap px-6 py-4 underline text-blue-700"> <a
            href={`mailto:${student.emmail}?Subject=${student.fullname}`}
          >
            {student.emmail}</a></td>
              <td class="whitespace-nowrap px-6 py-4">{student.institution}</td>
              <td class="whitespace-nowrap px-6 py-4">{student.pgname}</td>
              <td class="whitespace-nowrap px-6 py-4 underline text-blue-700"> <a
            href={`tel:${student.pgcontact}`}
          >
            {student.contact  }</a></td>
              <td class="whitespace-nowrap px-6 py-4">{student.checkindate}</td>
              <td class="whitespace-nowrap px-6 py-4">{student.createdAt}</td>
              <td class="whitespace-nowrap px-6 py-4 hidden">{student.userId}</td>
              <td class="whitespace-nowrap px-6 py-4 text-md font-bold">
  <button onClick={() => toggleStatus()}>{statusToggle ? 'Approved' : 'Pending'}</button>
</td>
      <td class="whitespace-nowrap px-6 py-4"> <input className='cursor-pointer ' type='checkbox' onClick={() => handleEdit(student) }/></td>
             
              <td class="whitespace-nowrap px-6 py-4 text-red-600"><button onClick={() => handleDelete(student.docId)}>
                      Delete
                    </button></td>
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
          </main>
      </div> 
        <label htmlFor="sidebar-toggle" className='body-label'/>
    </div>
}
   
  </div>
  )
}

export default Bookings