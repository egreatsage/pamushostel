
import {Menu, MenuHandler,  MenuList,Tooltip} from '@material-tailwind/react';
import { AiOutlineMore } from 'react-icons/ai';
import React,{useState,useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import {useUserAuth} from '../../Common/UserAuthContext'
import dbdataservice from '../../Common/Operations';
import Profile from '../../Common/Profile';
import {FcPrint} from 'react-icons/fc'
import { useReactToPrint } from 'react-to-print';
import Navbar from '../Components/Navbar';
const UserProfile = () => {
    
    const { user,} = useUserAuth();
    const [bookings, setBookings] = useState([]);
    const [occupants, setOccupants] = useState([]);
    let userId = user.uid;
    useEffect(() => {
        getAllBookings();
    }, []);
    const getAllBookings = async () => {
        const data = await dbdataservice.getAllBookings();
        setBookings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }; 
      useEffect(() => {
        getAllOccupants();
      }, []);
      const getAllOccupants = async () => {
        const data = await dbdataservice.getAllOccupants();
        setOccupants(data.docs.map((doc) => ({ ...doc.data(),
          id: doc.id })));
      };

    const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
  return (
  <div>
    <div className='mb-8'>
    <Navbar/>
    </div>
       <div className='md:px-3 pt-  6 rounded-md shadow-lg border'>    
       <div className=' mb-4'>  
</div> 
    <div className='px-5 my-5 justify-between flex'>
    <div className='font-bold text-2xl md:text-3xl mt-4'> 
    </div>
    <div className='flex gap-2'>
       <div className='mt-[9px]'>
       <Profile/>
       </div>
        <Menu>
      <MenuHandler>
          <button>
          <AiOutlineMore className='lead leading-8 top-0 text-2xl bold cursor-pointer'/>
          </button>
      </MenuHandler>
     
      <MenuList className='flex flex-col mt-3'>
      <h1 className='mt-3 text-black text-center mb-3'>More Actions</h1>
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/booking'>Book A Room</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/rules'>Hostel Rules</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/notices'>Hostel Notices</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/booking'>Contact Admin</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/booking'>Connect with friends</Link>
      </MenuList>
    </Menu>
       
    </div>
    </div>
    <div className='ml-3'>
    <Tooltip title='Print Document' placement='right'>
    <button className='rounded-full bg-white hover:shadow-md' onClick={handlePrint}>
        <FcPrint className='text-2xl'/>
    </button>
    </Tooltip>
    </div>
   
<div ref={componentRef} className='mt-4'>
<div className='px-3 mb-9 '>
<div className='text-2xl text-black md:text-3xl '><p>Room Details</p></div>
   
     {occupants?.filter((room) => room.userId === userId).map((doc, index) => {
        return(
     <div className='bg- px-5'>
     <div className='px-5 py-3'>
     <div className=' mb-4 md:flex md:gap-7'>    
     <div>
        <div className=' mb-4'>
            <p className='flex text-black font-bold'><span className='font-bold tracking-wide text-gray-800 mr-2'>Room Number: </span> {doc.RoomNo}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Entry Date: </span> {doc.EntryDate}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Exit Date: </span> {doc.ExitDate}</p>
        </div>
     </div>
     <div>

        <div className=' mb-4'>
            <p className='flex text-black'> <span className='font-bold tracking-wide text-gray-800 mr-2'>Period: </span> {doc.Period}</p>
        </div>
        
     </div>
     </div>
     </div>
     </div>
       )
    })}
</div>

 {bookings?.filter((booking) => booking.userId === userId).map((doc, index) => {
        return(
    <div className='w-full rounded-md md:px-9 bg-[white] text-white  shadow-lg mt-3'>  
     <div className='px-5'>
     <div className='text-xl text-black font-bold mb-2 tracking-wider'><p>Personal Information</p></div>
     <div className='grid md:grid-cols-3 gap-1'>    
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'> <span className='font-bold tracking-wide text-gray-800 mr-2'>First Name: </span> <span>{doc.FName}</span></p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Last Name: </span> {doc.LName}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Gender: </span> {doc.Gender}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'>  <span className='font-bold tracking-wide text-gray-800 mr-2'>Phone Number: </span> {doc.PNumber}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'>  <span className='font-bold tracking-wide text-gray-800 mr-2'>Email Address: </span> {doc.email}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Marital Status </span>{doc.MaritalStatus} </p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Home County: </span> {doc.Homecounty}</p>
        </div>
     </div>
     </div>
     </div>
     
     <div className='px-5 py-3'>
     <div className='text-xl text-black font-bold mb-2 tracking-wider'><p>Parent/Guardian Information</p></div>
     <div className='grid md:grid-cols-3'>    
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Full Name: </span> {doc.PGName}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Contact: </span>{doc.PGContact}</p>
        </div>
     </div>
     </div>
     </div>
     
     <div className='px-5 py-3'>
     <div className='text-xl text-black font-bold mb-2 tracking-wider'><p>Emergency Information</p></div>
     <div className='grid md:grid-cols-3'>    
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Full Name: </span> {doc.EName}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Contact: </span> {doc.EContact}</p>
       </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Relation: </span> {doc.Relation}</p>
       </div>
     </div>
     </div>
     </div> 
    
     <div className='px-5 py-3'>
     <div className='text-xl text-black font-bold mb-2 tracking-wider'><p>Academic Information</p></div>
     <div className='grid md:grid-cols-3'>    
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Institution Name: </span> {doc.Institution}</p>
        </div>
     </div>
     <div>
        <div className=' mb-4'>
            <p className='flex text-black'><span className='font-bold tracking-wide text-gray-800 mr-2'>Year Of Study: </span> {doc.YearOfStudy}</p>
       </div>
     </div>
     
     
     </div>
     </div> 
    </div>
     )
    })}
</div>
<div>
    
   
</div>
</div>

  </div>
  )
}

export default UserProfile