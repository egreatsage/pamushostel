import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../Common/UserAuthContext'
import Navbar from '../Components/Navbar'
import Swal from 'sweetalert2'


const SignIn= () => {
  const {logIn} = useUserAuth();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showPassword, setShowPassword] = useState()

  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
  try{
    e.preventDefault();
    await logIn(email,password);
    setTimeout(() => {
      navigate('/dashboard')
     }, 1000);
  }catch(err){
    Swal.fire({
      title: 'Error!',
      text: 'Problem signing in, please try again',
      icon: 'error',
      timer:3000,
      width:400,
      position:'top-right',
      confirmButtonText: 'Close'
    })
          }  
      }        
  return (
    <section>
              <div className='fixed top-2 z-10 w-full '>
    <Navbar/>
    </div>
    <h1 className="text-3xl text-center mt-20 font-bold">Admin Login</h1>
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
      <div className="w-full md:w-[67%] lg:w-[40%] ">
        <form onSubmit={handleSubmit}>  
          <input
            type="email"
            id="email"
            name='email'
            onChange={e=>setEmail(e.target.value)}
            placeholder="Email address"
            className="mb-6 w-full px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded-full transition ease-in-out"
          />
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
             name='password'
              onChange={e=>setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 text-md border text-gray-700 bg-white border-gray-300 rounded-full transition ease-in-out"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <AiFillEye
                className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
          </div>
         
          <button
            className="w-full bg-orange-600 text-white px-7 py-3 text-sm font-bold uppercase rounded-full shadow-md transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            type="submit"
          >
            Login
          </button>
         
        </form>
      </div>
    </div>
  </section>
  )
}

export default SignIn