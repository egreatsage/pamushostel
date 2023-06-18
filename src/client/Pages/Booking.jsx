import { useEffect, useState } from "react";
import { useUserAuth } from "../../Common/UserAuthContext";
import { useNavigate } from "react-router-dom";
import dbdataservice from '../../Common/Operations'
import Navbar from '../Components/Navbar'
import { Input, Select ,Option} from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Common/dbconfig";
const Booking = ({id}) => {
  const {user} = useUserAuth();
  const [fullname, setfullname] = useState('');
  const [contact, setcontact] = useState('');
  const [institution, setinstitution] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [schoolData,setSchoolData] = useState([]);
  const [pgcontact, setpgcontact] = useState('');
  const [pgname, setpgname] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [message, setmessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  let userId = user ? user.uid : null; 
  let emmail = user ? user.email : null; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage("");
    const newBooking = {
     fullname,contact,pgcontact,pgname,
     institution,emmail,checkindate,userId,selectedGender, createdAt: new Date().toISOString(),
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
    setfullname(""); setcontact("");setpgcontact("");
    setpgname(""); setinstitution('');   setcheckindate('');
    setSelectedGender('');
  };
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
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
  return (
    <div>
      <Navbar/>
      <div className='md:mx-10 mt-32 border rounded-md shadow-lg h-auto px-4 py-8'>
        <h1 className="mt-8 mb-4 flex md:justify-start justify-center text-xl tracking-wide font-bold">Fill in the details below</h1>
      <form onSubmit={handleSubmit} >
        <div className='grid md:py-6 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-hidden'>
        <div className='my-3'><Input
         value={fullname}
         onChange={(e)=>setfullname(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Full Name' required/></div>
         <div className='my-3'><Input color='teal' type='tel' className='text-black' variant='standard' label='Phone Number'
       value={contact}
       onChange={(e)=>setcontact(e.target.value)} required/></div>
     
        <div className='my-3'>
        <select
          className='text-blue-gray-400 w-full md:mt-[21px] border-b bg-none border-b-blue-gray-300 '
             value={selectedGender}
             onChange={(e) => setSelectedGender(e.target.value)}
             >
     <option className='pt-9' value="">Select Gender</option>
     <option  value='male'>Male</option>
     <option  value='Female'>Female</option>

  </select>
        </div>
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