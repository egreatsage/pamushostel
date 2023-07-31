import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../Common/UserAuthContext'
import Navbar from '../Components/Navbar'
import { auth } from '../../Common/dbconfig'
const SignIn = () => {
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState();

  const navigate = useNavigate();

  // Function to check the admin status
  const checkAdminStatus = async (userId) => {
    try {
      const userDocRef = doc(collection(db, 'ActiveUsers'), userId);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      if (userData && userData.admin === 'true') {
        // If the admin field is 'true', navigate to the dashboard
        navigate('/dashboard');
      } else {
        // If the admin field is 'false' or not present, navigate to home
        navigate('/booking');
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await logIn(email, password);
      const user = auth.currentUser;
      const userId = user.uid;
      checkAdminStatus(userId);

    } catch (err) {
      alert(err);
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
        <h1 className='text-center flex text-2xl font-semibold my-7'>Sign In</h1>
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
                type='email'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border bg-gray-800 text-white text-xl font-semibold border-gray-400' type='submit'>Login</button>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-md">
            <p className="mb-6">
              No account?
              <Link
                to="/signup"
                className="text-red-600 underline hover:text-red-700 transition duration-200 ease-in-out ml-1"
              >
                Create one
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
          </div>
        </form>

      </div>
     </div>
    </div>
  )
}

export default SignIn