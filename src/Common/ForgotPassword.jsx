import React from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../client/Components/Navbar";
import { useToast } from '@chakra-ui/react';


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast({
        description:'please check your email for your password reset link',
        status:'success',
        duration:9000,
        position:'top'
  
     })
   setTimeout(() => {
    navigate('/')
   }, 10000);
    } catch (error) {
   toast({
      description:`${error.message}`,
      status:'error',
      duration:9000,
      position:'top'

   })
    }
  }
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center h-screen'>
             <div className='flex flex-col border px-10 py-20 shadow-lg rounded-md mt-2 mb-2'>
              <h1 className='text-center flex text-2xl font-semibold my-7'>Reset Your Password</h1>
              <label >Enter Your email address </label>
              <form className='flex flex-col' onSubmit={onSubmit}>
             <input
              className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
             />
               <button className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border bg-gray-800 text-white text-xl font-semibold border-gray-400' type='submit'>Submit</button>
               </form>
             </div>
      </div>
    </div>
  )
}

export default ForgotPassword