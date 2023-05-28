import React, { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 opacity-60'>
       <nav className="shadow-lg bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white">Logo</span>
            </div>
          </div>
          <div className="hidden md:block ">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-gray-900 hover:bg-gray-200  hover:font-bold px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="text-gray-900 hover:bg-gray-200  hover:font-bold px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#" className="text-gray-900 hover:bg-gray-200  hover:font-bold px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="#" className="text-gray-900 hover:bg-gray-200  hover:font-bold px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
             <AiOutlineMenu/>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#" className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#" className="text-gray-900 hover:bg-gray-200 hover:font-bold block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
    </div>
  
  );
};

export default Navbar;
