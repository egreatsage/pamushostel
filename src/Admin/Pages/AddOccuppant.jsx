import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../Common/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import dbdataservice from '../../Common/Operations'
import Swal from "sweetalert2";
import Loader from "../../client/Components/Loader";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Profile from "../../Common/Profile";
import { Input } from "@material-tailwind/react";
import { MdAdminPanelSettings, MdBedroomParent, MdSpaceDashboard } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
const AddOccupant = ({ id,setOccupantId }) => {
  const {user} = useUserAuth();
  const [fullname, setfullname] = useState('');
  const [contact, setcontact] = useState('');
  const [institution, setinstitution] = useState('');
  const [emmail, setemmail] = useState('');
  const [gender, setgender] = useState('');
  const [pgname, setpgname] = useState('');
  const [pgcontact, setpgcontact] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [roomno, setroomno] = useState('');
  const [allocateddate, setallocateddate] = useState('');
  const [checkoutdate, setcheckoutdate] = useState('');
  const [loading,setloading] = useState(false)
  const [message, setmessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage('')
    
      const newOccupant = {
        fullname, contact, institution, emmail, pgname, pgcontact,
        checkindate,gender,roomno,allocateddate,checkoutdate,selectedGender
      };
   
    setloading(true)
      try { 
        if (id !== undefined && id !== "") {
          await dbdataservice.updateOccupant(id, newOccupant);
        setOccupantId("");
              Swal.fire({
                              icon:'success',
                              title: 'Success',
                              text: 'Occupant Updated Successfully',
                              showConfirmButton: false,
                              timer: 2000
                            });
                            navigate("/occupants");
        } else {
          await dbdataservice.addOccupant(newOccupant);
                Swal.fire({
                                              icon:'success',
                                              title: 'Success',
                                              text: 'Occupant Added Successfully',
                                              showConfirmButton: false,
                                              timer: 2000
                                            });
                                            navigate("/occupants");
                  
          setTimeout(() => {
            navigate('/occupants')
          }, 1000);
          
        }
      
      } catch (err) {
        console.log(err)
      }
      
      setfullname('');setcontact('');setinstitution('');setemmail('');setpgname('');setpgcontact('');
      setcheckindate(''); setgender('');setroomno('');setallocateddate('');setcheckoutdate(''); setSelectedGender('')

  };
  const editHandler = async () => {
    setmessage('');
    try {
      const docSnap = await dbdataservice.getOccupant(id);
      setfullname(docSnap.data().fullname);
      setSelectedGender(docSnap.data().selectedGender);
      setcontact(docSnap.data().contact);
      setinstitution(docSnap.data().institution);
      setpgname(docSnap.data().pgname);
      setpgcontact(docSnap.data().pgcontact);
      setemmail(docSnap.data().emmail);
      setcheckindate(docSnap.data().checkindate);
      setroomno(docSnap.data().roomno);
      setallocateddate(docSnap.data().allocateddate);
      setcheckoutdate(docSnap.data().checkoutdate);
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }   //eslint-disable-next-line
  }, [id]);
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
          <div className='overflow-y-auto  '>
          <div className='md:mx-10 mx-2 mt-20 my-10'>
      <form onSubmit={handleSubmit} >

      <div className='grid md:py-6 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-hidden'>

        <div className='my-3'>
        <Input
         value={fullname}
         onChange={(e)=>setfullname(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Full Name' required/>
        </div>

        <div className='my-3'>
      <Input color='teal' type='tel' className='text-black' variant='standard' label='Gender'
       value={selectedGender}
       onChange={(e)=>setSelectedGender(e.target.value)} required/>
       </div>


      <div className='my-3'>
      <Input color='teal' type='tel' className='text-black' variant='standard' label='Phone Number'
       value={contact}
       onChange={(e)=>setcontact(e.target.value)} required/>
       </div>

       <div className='my-3'>
       <Input color='teal' type='text' className='text-black' variant='standard' label='Your Institution  '
       value={institution}
       onChange={(e)=>setinstitution(e.target.value)}
       required/>
       </div>

      <div className='my-3'>
      <Input color='teal' type='email' className='text-black' variant='standard' label='Your Email'
       value={emmail}
       onChange={(e)=>setemmail(e.target.value)}
      required/>
      </div>

      <div className='my-3'>
      <Input color='teal' type='text' className='text-black' variant='standard' label='Guardian/Parent Name '
       value={pgname}
       onChange={(e)=>setpgname(e.target.value)}
      required/>
      </div>

      <div className='my-3'>
      <Input color='teal' type='tel' className='text-black' variant='standard' label='Guardian/Parent Contact' required
       value={pgcontact}
       onChange={(e)=>setpgcontact(e.target.value)}
      />
      </div>

      <div className='my-3'>
      <Input color='teal' type='date' className='text-black' variant='standard' label='Check In'
         required 
        value={checkindate}
        onChange={(e)=>setcheckindate(e.target.value)}/>
      </div>

      <div className='my-3'>
        <Input color='teal' type='string' className='text-black' variant='standard' label='Room Number'
          required
         value={roomno}
         onChange={(e)=>setroomno(e.target.value)} />
      </div>

      <div className='my-3'>
        <Input color='teal' type='date' className='text-black' variant='standard' label='Allocated Date'
        required
        value={allocateddate}
        onChange={(e)=>setallocateddate(e.target.value)} />
      </div>

      <div className='my-3'>
        <Input color='teal' type='date' className='text-black' variant='standard' label='Check Out Date' 
        required value={checkoutdate}
        onChange={(e)=>setcheckoutdate(e.target.value)}/>
      </div>

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

export default AddOccupant