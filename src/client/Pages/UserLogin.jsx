import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import OAuth from '../../Common/OAuth'
import { useUserAuth } from '../../Common/UserAuthContext'
import Swal from 'sweetalert2'
import Navbar from '../Components/Navbar'
import { auth, db } from '../../Common/dbconfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
const UserLogin = () => {
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState();

  const navigate = useNavigate();

  // Function to check the admin status
  const checkAdminStatus = async (userId) => {
    try {
      const userDocRef = doc(collection(db, 'ActiveUsers'), userId);
      const userDocSnap = await getDocs(userDocRef);
      const userData = userDocSnap.data();
      if (userData && userData.admin === 'true') {
        // If the admin field is 'true', navigate to the dashboard
        navigate('/dashboard');
      } else {
        // If the admin field is 'false' or not present, navigate to home
        // navigate('/');
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await logIn(email, password);
      // Get the authenticated user's userId
      const user = auth.currentUser;
      const userId = user.uid;
      // Call the function to check admin status after successful login
      checkAdminStatus(userId);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <section>
      <Navbar/>
    <h1 className="text-3xl text-center  font-bold mt-20">Sign In |  studnent</h1>
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
      <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
          
            onChange={e=>setEmail(e.target.value)}
            placeholder="Email address"
            className="mb-6 w-full px-4 border py-2 text-md text-gray-700 bg-white border-gray-300 rounded-full transition ease-in-out"
          />
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
            
              onChange={e=>setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border text-md text-gray-700 bg-white border-gray-300 rounded-full transition ease-in-out"
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
            className="w-full mb-4 bg-orange-600 text-white px-7 py-3 text-sm font-bold uppercase rounded-full shadow-md transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            type="submit"
          >
            Sign In
          </button>
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-md">
            <p className="mb-6">
              Dont have an account?
              <Link
                to="/usersignup"
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
         
          {/* <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth /> */}
        </form>
      </div>
    </div>
  </section>
  )
}

export default UserLogin