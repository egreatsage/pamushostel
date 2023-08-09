
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../../Common/OAuth'
import { useUserAuth } from '../../Common/UserAuthContext'
import Navbar from '../Components/Navbar'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../../Common/dbconfig'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

const SignUp = () => {
  const {signUp} = useUserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [gender, setGender] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [school, setSchool] = useState('')
  const [staytime, setStaytime] = useState('')
  const [username] = useState()
  const [schools, setSchools] = useState([]);
  const toast = useToast();
  const handleSubmit = async e=> {
    e.preventDefault();
    try {
     
        await signUp(username, email, password);
        const user = auth.currentUser;
        const userId = user.uid;
    
        await addDoc(collection(db, 'RegisteredUsers'), {
          userId: userId, 
          email: email,
          createdAt: new Date().toISOString(),
          password: password,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          phonenumber: phonenumber,
          school: school,
          staytime: staytime,
          admin:'false',
        });
         toast({
          description: 'Account created successfully',
          status:'success',
          duration: 9000,
          position:'top'
         }) 
        navigate('/booking')
   
    } catch (err) {
      toast({
        description: `${err.message}`,
        status:'error',
        duration: 5000,
        position:'top'
       })
    }
  };

  useEffect(() => {
    const fetchSchools = async () => {
      const schoolsCollection = collection(db, 'Universities');
      const schoolsSnapshot = await getDocs(schoolsCollection);
      const schoolList = schoolsSnapshot.docs.map(doc => ({
        id: doc.id,
        Uname: doc.data().Uname, // Adjust the field name based on your data structure
      }));
      setSchools(schoolList);
    };

    fetchSchools();
  }, []);

  return (
    <div>
      <div>
      <Navbar/>
      </div>
    
      <div className='mb-8'>
   
      <div className='flex flex-col items-center justify-center h-auto md:h-screen md:mt-0 mt-40'>
      <h1 className='text-center flex text-2xl font-semibold mb-14'>Create your resident profile</h1>
        <form onSubmit={handleSubmit}>
           <div className='grid sm:grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3'>
           <div className='flex flex-col'>
           <label>Email Address</label>
           <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400' 
             placeholder='Enter email'
             type='email'
             id='email'
             onChange={e=> setEmail(e.target.value)}
             required/>
           </div> 
           <div className='flex flex-col'>
           <label>Password</label>
           <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
             placeholder='Enter Password'
             type='password'
             onChange={e=> setPassword(e.target.value)}
             required/>
           </div> 
           <div className='flex flex-col'>
           <label>Firstname</label>
           <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400' 
             placeholder='Enter firstname'
             type='text'
             id='firstname'
             onChange={e=> setFirstname(e.target.value)}
             required/>
           </div> 
           <div className='flex flex-col'>
           <label>Lastname</label>
           <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'   placeholder='Enter lastname'
           type='text'
           id='lastname'
           onChange={e=> setLastname(e.target.value)}
           required/>
           </div> 
           <div className='flex flex-col'>
           <label>Gender</label>
           <select
            className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
             onChange={e=> setGender(e.target.value)}
             id='gender'
             required
             >
             <option className='pt-9'  value="">Select Gender</option>
             <option  value='male'>Male</option>
           <option  value='Female'>Female</option>
          </select>
           </div> 
           <div className='flex flex-col'>
           <label>PhoneNumber</label>
           <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
            placeholder='Enter Phonenumber'
            type='tel'
            onChange={e=> setPhonenumber(e.target.value)}
            required/>
           </div> 
           <div className='flex flex-col'>
        <label>School</label>
        <select
          className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          onChange={e => setSchool(e.target.value)}
          required
        >
          <option className='pt-9' value=''>
            Select School
          </option>
          {schools.map(school => (
            <option key={school.id} value={school.Uname}>
              {school.Uname}
            </option>
          ))}
        </select>
      </div>
           </div>
           <div className='justify-end flex '>
          <button type='submit' className='bg-blue-gray-900 text-white rounded-[10px]  py-[6px] hover:shadow-2xl px-6'>Submit</button>
      </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default SignUp