import { useEffect, useState } from "react";
import { useUserAuth } from "../../Common/UserAuthContext";
import { useNavigate } from "react-router-dom";
import dbdataservice from '../../Common/Operations'
import Navbar from '../Components/Navbar'
import { Input } from "@material-tailwind/react";
const Booking = ({id}) => {
  const {user} = useUserAuth();
  const [fullname, setfullname] = useState('');
  const [contact, setcontact] = useState('');
  const [institution, setinstitution] = useState('');
  const [gender, setgender] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [pgcontact, setpgcontact] = useState('');
  const [pgname, setpgname] = useState('');
  const [loading, setloading] = useState(false);
  const [emmail, setemmail] = useState('');
  const [message, setmessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  let userId = user ? user.uid : null; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage("");
    const newBooking = {
     fullname,contact,gender,pgcontact,pgname,
     institution,emmail,checkindate,userId
    };
    console.log(newBooking)
    try {
      if (id !== undefined && id !== "") {
        await dbdataservice.updateBooking(id, newBooking);
        setBookingId("");
        setmessage({ error: false, msg: "Updated successfully!" });
      } else {
        await dbdataservice.addBooking(newBooking); 
        setmessage({ error: false, msg: "Details added successfully!" });
        setTimeout(() => {
          navigate('/reply');
      }, 1000);
      }
    } catch (err) { 
      setmessage({ error: true, msg: err.message });
    }
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
      setmessage({ error: true, msg: err.message });
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
      <Navbar/>
      <div className='md:mx-10 mt-32 border rounded-md shadow-lg h-screen px-4'>
      <form onSubmit={handleSubmit} >
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
  )
}

export default Booking