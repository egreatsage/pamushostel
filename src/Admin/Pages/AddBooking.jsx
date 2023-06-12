import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../Common/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import dbdataservice from '../../Common/Operations'
import Loader from "../../client/Components/Loader";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Profile from "../../Common/Profile";
import { Input } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { MdAdminPanelSettings, MdBedroomParent, MdSpaceDashboard } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
const AddBooking = ({ id,setBookingId }) => {
  const {user} = useUserAuth();
  const [fullname, setfullname] = useState('');
  const [contact, setcontact] = useState('');
  const [institution, setinstitution] = useState('');
  const [selectedGender, setgender] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [pgcontact, setpgcontact] = useState('');
  const [pgname, setpgname] = useState('');
  const [loading, setloading] = useState(false);
  const [emmail, setemmail] = useState('');
  const [message, setmessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage("");
    const newBooking = {
     fullname,contact,gender,pgcontact,pgname,
     institution,emmail,checkindate
    };
    console.log(newBooking)
    try {
      if (id !== undefined && id !== "") {
        await dbdataservice.updateBooking(id, newBooking);
        setmessage({ error: false, msg: "New Booking added successfully!" });
        Swal.fire({
          position: "top-right",
          icon: "success",
          text: "Details updated successfully!",
          showConfirmButton: false,
          timer: 2000,
        })
        setBookingId("");
      
 
   
      } else {
        await addDoc(collection(db,'Bookings'), newBooking); 
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "Details added successfully!",
          showConfirmButton: false,
          timer: 2000,
        })
        setTimeout(() => {
          navigate('/bookings');
      }, 1000);

      }
    } catch (err) { 
      Swal.fire({ 
        position: "top-right",
        icon: "error",
        text: "error,try again!",
        showConfirmButton: false,
        timer: 2000,

      });
    }
    console.log({error: true, msg: err.message})
    setfullname(""); setcontact("");setgender("");setpgcontact("");
    setpgname(""); setinstitution('');   setemmail(''); setcheckindate('');
  };

  const editHandler = async () => {
    setmessage("");
    try {
      const docSnap = await dbdataservice.getBooking(id);
      setfullname(docSnap.data().fullname);
      setcontact(docSnap.data().contact);
      setpgcontact(docSnap.data().pgcontact);
      setpgname(docSnap.data().pgname);
      setinstitution(docSnap.data().institution);
      setemmail(docSnap.data().emmail);
      setcheckindate(docSnap.data().checkindate);
    } 
    catch (err) {
      console.log({ error: true, msg: err.message });
      Swal.fire({ 
        position: "top-right",
        icon: "error",
        text: "error,try again!",
        showConfirmButton: false,
        timer: 2000,

      });
    }
  };
  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }   //eslint-disable-next-line
  }, [id]);
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
          <div className='overflow-y-auto  '>
         
          <div className='md:mx-10 mx-2 mt-20 my-10'>
      <form onSubmit={handleSubmit} >
      <h1 className="text-xl mx-2 font-semibold tracking-wider">Add/Edit Booking Details</h1>
        <div className='grid md:py-6 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-hidden'>
        <div className='my-3'><Input
         value={fullname}
         onChange={(e)=>setfullname(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Full Name' required/></div>
         <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Phone Number'
       value={contact}
       onChange={(e)=>setcontact(e.target.value)} required/></div>
      <div className='my-3'><Input color='teal' type='text' className='text-black' variant='standard' label='Your institution  '
       value={institution}
       onChange={(e)=>setinstitution(e.target.value)}
       required/></div>
      <div className='my-3'><Input color='teal' type='email' className='text-black' variant='standard' label='Your Email'
       value={emmail}
       onChange={(e)=>setemmail(e.target.value)}
      required/></div>
      <div className='my-3'><Input color='teal' type='text' className='text-black' variant='standard' label='Guardian/Parent Name '
       value={pgname}
       onChange={(e)=>setpgname(e.target.value)}
      required/></div>
      <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Guardian/Parent Contact' required
       value={pgcontact}
       onChange={(e)=>setpgcontact(e.target.value)}
      /></div>
     
      <div className='my-3'><Input color='teal' type='date' className='text-black' variant='standard' label='Check In' 
       value={checkindate}
       onChange={(e)=>setcheckindate(e.target.value)}
      /></div>
        </div> 
        <div  className='flex justify-end '> <button type='submit' className='rounded-md bg-[gray] text-white font-semibold px-3 py-1'>Submit </button></div>
      </form>
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

export default AddBooking