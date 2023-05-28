
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../../Common/OAuth'
import { useUserAuth } from '../../Common/UserAuthContext'
import Navbar from '../Components/Navbar'
import Swal from 'sweetalert2'

const SignUp = () => {
  const {signUp} = useUserAuth();
  const [email, setEmail] = useState()
  const [username] = useState()
  const [password, setPassword] = useState()
  const [showPassword, setShowPassword] = useState()
 
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
  try{
    e.preventDefault();
    await signUp(username, email,password);
    setTimeout(() => {
      navigate('/booking')
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
              <div className='fixed top-2 z-10 w-full'>
    <Navbar/>
    </div>
    <h1 className="text-3xl text-center mt-20 font-bold">Sign Up | Hosteller</h1>
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
      <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
        <img
          src="https://images.pexels.com/photos/5138173/pexels-photo-5138173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="key"
          className="w-full rounded-2xl"
        />
      </div>
      <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
           name='email'
            onChange={e=>setEmail(e.target.value)}
            placeholder="Email address"
            className="mb-6 w-full px-4 py-2 text-md border text-gray-700 bg-white border-gray-300 rounded-full transition ease-in-out"
          />
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
               name='email'
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
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-md">
            <p className="mb-6">
              Have a account?
              <Link
                to="/login"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
              >
                Sign in
              </Link>
            </p>
            <p>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Forgot password?
              </Link>
            </p>
          </div>
          <button
            className="w-full bg-orange-600 text-white px-7 py-3 text-sm font-medium uppercase rounded-full shadow-md transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            type="submit"
          >
            Sign up
          </button>
          <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </form>
      </div>
    </div>
  </section>
  )
}

export default SignUp