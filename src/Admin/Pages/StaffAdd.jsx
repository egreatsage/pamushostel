import React, { useState,useEffect } from 'react'
import {Input} from "@material-tailwind/react";
import dbdataservice from '../../Operations';
import {  useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav';
import { toast } from 'react-toastify';

const EmployeeAdd = ({ id, setStaffId }) => {
  const [fullname, setfullname] = useState('');
  const [category, setcategory] = useState('');
  const [phonenumber, setphonenumber] = useState('');
 
  const [idee, setIdee] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullname === "" || category === "") {
      toast.error('Fill In All Fields')
      return;
    }
    const newStaff = {
     fullname,category,phonenumber,idee
    };
    try {
      if (id !== undefined && id !== "") {
        await dbdataservice.updateStaff(id, newStaff);
        setStaffId("");
        toast.success('Updated Successfully')
        setTimeout(() => {
          navigate('/staff');
      }, 3000);
      } else {
        await dbdataservice.addStaff(newStaff);
        toast.success('New Staff Added')
        setTimeout(() => {
          navigate('/staff');
      }, 3000);
      }
    } catch (err) {
      toast.error('Error Adding')
    }
    setfullname(""); setcategory(""); setphonenumber("");
  };
  
  const editHandler = async () => {
    try {
      const docSnap = await dbdataservice.getStaff(id);
      setfullname(docSnap.data().fullname);
      setcategory(docSnap.data().category);
      setphonenumber(docSnap.data().phonenumber);
      setIdee(docSnap.data().idee);
    } catch (err) {
      toast.error('Error Editing')
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }   //eslint-disable-next-line
  }, [id]);
 
 
  return (
    <div>
       <div><Nav/></div>
       <div className='pt-5 bg-[#FAFBFB]'>
    <p className='text-xl text-gray-600 text-center'>Add Or Edit Staff Details</p>
    <div class="mt-5 ">
      <div className='md:pl-9 '>
      </div>
  <form onSubmit={handleSubmit} >
  <div className="mt-5 md:mt-0 md:col-span-2 ">
    <div className="shadow  sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Full Name"   className="mt-1 focus:ring-blue-500 focus:border-blue-500 block 
            w-full
             shadow-sm sm:text-sm border-gray-500 rounded-md"
             type='text'
             value={fullname}
             onChange={(e)=>setfullname(e.target.value)}
            />
          </div>
         
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Phone Number" type="text" 
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={phonenumber}
            onChange={(e)=>setphonenumber(e.target.value)}
            />
          </div>
         
          <div className="col-span-6 sm:col-span-3">
            <Input  label="category" type="text"  
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full
             shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={category} 
             onChange={(e)=>setcategory(e.target.value)}/>
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <Input  label="National ID" type="text"   className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm 
             sm:text-sm border-gray-300 rounded-md"
             value={idee}
             onChange={(e)=>setIdee(e.target.value)}
             />
          </div>
         
          
        </div>
      </div>
    </div>
</div>
<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
<button  className='bg-gray-700  px-6 rounded-md border text-white py-1'type='submit' variant='standard'>Submit</button>
      </div>
</form>
    </div>
    
      
    
    </div>
    </div>
   
  )
}

export default EmployeeAdd