
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../../Common/OAuth'
import { useUserAuth } from '../../Common/UserAuthContext'
import Navbar from '../Components/Navbar'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../Common/dbconfig'
import { useToast } from '@chakra-ui/react'

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
      setTimeout(() => {
        navigate('/booking')
       }, 2000);
    } catch (err) {
      return alert(err);
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
        
           onChange={e=> setFirstname(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Last Name</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter lastname'
          type='text'
          
           onChange={e=> setLastname(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Gender</label>
        <select
      className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
            
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
        
           onChange={e=> setPhonenumber(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >School</label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='Enter school'
          type='text'
       
           onChange={e=> setSchool(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
        <label className='text-gray-700 ' >Expected staytime in months </label>
          <input className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
          placeholder='e.g 5 months'
          type='text'
         
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

export default SignUp