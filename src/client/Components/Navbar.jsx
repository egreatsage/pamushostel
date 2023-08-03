import React, { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../Common/UserAuthContext';
const Navbar = () => {
  const {user,logOut} = useUserAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handlelogout= async ()=>{
    try{
        await logOut();
           navigate('/')
    }catch{     
    }
  }
  return (
    <div className='fixed top-0 left-0 right-0 z-50 opacity-70'>
       <nav className="border-b border-gray-400 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to={'/'}>
              <span className="text-black font-extrabold tracking-widest text-2xl ">Le Pamus </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:block ">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to={'/'} className="text-gray-900 hover:bg-gray-200  hover:font-bold px-3 py-2 rounded-md text-sm font-bold">Home</Link>
              {/* <Link to={'/'} className="text-gray-900 hover:bg-gray-200  hover:font-bold px-3 py-2 rounded-md text-sm font-bold">About</Link> */}
              <Link to={'/studentprofile'} className="text-gray-900 hover:bg-gray-200  hover:font-bold px-3 py-2 rounded-md text-sm font-bold">Student</Link>
              {user ? (
      <Link to={'/booking'} className="text-[orange] hover:bg-gray-200 opacity-100  hover:font-bold px-3 py-2 rounded-full hover:border text-sm font-bold">Book Now</Link>
      ) : (
        <Link to={'/signin'} className="text-[orange] hover:bg-gray-200 opacity-100  hover:font-bold px-3 py-2 rounded-full hover:border text-sm font-bold">Book Now</Link>
      )}
             
              {user ? (
        <button className='hover:border hover:shadow-lg border-red-300 text-[red] px-3 py-1 rounded-lg' onClick={handlelogout}>Logout</button>
      ) : (
        <button className='hidden' >Login</button>
      )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-black hover:font-bold hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-black">
             <AiOutlineMenu/>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden z-50 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to={'/'} className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            {/* <Link to={'/'} className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">About</Link> */}
            <Link to={'/studentprofile'} className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">Student</Link>
            <Link to={'/signin'} className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">Book Now</Link>
            {user ? (
        <button className='hover:border hover:shadow-lg border-red-300 text-[red] px-3 py-1 rounded-lg' onClick={handlelogout}>Logout</button>
      ) : (
        <button className='hidden' >Login</button>
      )}
          </div>
        </div>
      )}
    </nav>
    </div>
  
  );
};

export default Navbar;
