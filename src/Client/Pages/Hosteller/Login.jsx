import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Profile from '../../../Common/Profile'
import { useUserAuth } from '../../../Context/UserAuthContext'
import Navbarr from '../../Components/Navbar'

const Login= () => {
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
      navigate('/userprofile')
     }, 6000);
    toast.success('Successfully Signed In')
  }catch(err){
    toast.error('Problem Signing in,Try again')
          }  
      }        
  return (
    <section>
              <div className='fixed top-2 z-10 w-full'>
    <Navbarr/>
    </div>
    <h1 className="text-3xl text-center mt-6 font-bold">Sign In | Hosteller</h1>
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
      <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
        <img
          src="https://images.pexels.com/photos/763934/pexels-photo-763934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
            className="mb-6 w-full px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
             name='password'
              onChange={e=>setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 text-md border text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            <Profile/>
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
              Dont have an account?
              <Link
                to="/signup"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
              >
                Sign Up
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
            className="w-full bg-[#17202A] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            type="submit"
          >
            Login
          </button>
          <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          {/* <OAuth /> */}
        </form>
      </div>
    </div>
  </section>
  )
}

export default Login