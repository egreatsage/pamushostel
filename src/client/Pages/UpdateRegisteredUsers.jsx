
import React, { useEffect, useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import OAuth from '../../Common/OAuth'
import { useUserAuth } from '../../Common/UserAuthContext'
import Navbar from '../Components/Navbar'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../Common/dbconfig'
import { useToast } from '@chakra-ui/react'

const UpdateRegisteredUsers = () => {
 
    const { userId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [school, setSchool] = useState('')
    const [staytime, setStaytime] = useState('')
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, 'RegisteredUsers', userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setEmail(userData.email);
            setPassword(userData.password);
            setFirstname(userData.firstname);
            setLastname(userData.lastname);
            setGender(userData.gender);
            setPhonenumber(userData.phonenumber);
            setSchool(userData.school);
            setStaytime(userData.staytime);
           
          } else {
            console.log('User not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast({
            description: 'Error fetching user data',
            status: 'error',
            duration: 5000,
            position: 'top',
          });
        }
      };
  
      fetchUserData();
    }, [userId]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Update user data in Firestore
        const userRef = doc(db, 'RegisteredUsers', userId);
        await updateDoc(userRef, {
          email,
          password,
          // ... (other user data properties)
        });
  
        toast({
          description: 'User data updated successfully',
          status: 'success',
          duration: 5000,
          position: 'top',
        });
  
        navigate('/registered-users'); // Replace with the route of the RegisteredUsers component
      } catch (error) {
        console.error('Error updating user data:', error);
        toast({
          description: 'Error updating user data',
          status: 'error',
          duration: 5000,
          position: 'top',
        });
      }
    };
  return (
    <div>
      <div>
      <Navbar/>
      </div>
      <div >
      <div className='flex items-center justify-center h-auto md:h-screen md:mt-0 mt-56'>
        <form className='mb-5' onSubmit={handleSubmit} >
        <h1 className='text-center flex text-2xl font-semibold my-7'>Create an account</h1>
          <div className='grid md:grid-cols-3 md:gap-4'>
          <div className='flex flex-col '>
        <label className='text-gray-700' >Email</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter email'
          type='email'
           onChange={e=> setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Password</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter Password'
          type='password'
          
           onChange={e=> setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >First Name</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter firstname'
          type='text'
          value={firstname}
           onChange={e=> setFirstname(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Last Name</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter lastname'
          type='text'
          value={lastname}
           onChange={e=> setLastname(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Gender</label>
        <select
      className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
             value={gender}
             onChange={e=> setGender(e.target.value)}
             >
     <option className='pt-9'  value="">Select Gender</option>
     <option  value='male'>Male</option>
     <option  value='Female'>Female</option>

  </select>
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Phone Number</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter Phonenumber'
          type='tel'
          value={phonenumber}
           onChange={e=> setPhonenumber(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >School</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter school'
          type='text'
           value={school}
           onChange={e=> setSchool(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Expected staytime in months </label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='e.g 5 months'
          type='text'
           value={staytime}
           onChange={e=> setStaytime(e.target.value)}
          />
        </div>
          </div>
          <div className='flex justify-end mt-6'>
         
           <button type='submit' className='bg-blue-gray-900 text-white rounded-[10px]  py-[6px] hover:shadow-2xl px-6'>Submit</button></div>
         
      
        </form>
      </div>
      </div>
    </div>
  )
}

export default UpdateRegisteredUsers