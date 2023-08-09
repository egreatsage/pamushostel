import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../Common/UserAuthContext';
import Navbar from '../Components/Navbar';
import { useToast } from '@chakra-ui/react';
import { auth, db } from '../../Common/dbconfig';
import { collection, doc, getDoc } from 'firebase/firestore';

const SignIn = () => {
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await logIn(email, password);
      toast({
        description: 'Successfully logged in',
        status: 'success',
        duration: 5000,
        position: 'top',
      });
      navigate('/studentprofile')
    } catch (error) {
      toast({
        description: `${error.message}`,
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
    
      <div>
      <div className='flex items-center justify-center h-screen'> 
      <form onSubmit={handleSubmit}>
      <h1 className='text-center flex text-2xl font-semibold my-7'>Tenant Signin</h1>
        <div>
        <div className='flex flex-col'>
            <label>Email Address</label>
            <input
              className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        
          <div className='flex flex-col'>
            <label>Password</label>
            <input
              className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border bg-gray-800 text-white text-xl font-semibold border-gray-400' type='submit'>Sign In</button>
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-md">
          
          <p>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
            >
              Forgot password?
            </Link>
          </p>
        </div>
        </div>
      </form>

    </div>
   </div>
  </div>
  )
}

export default SignIn;
