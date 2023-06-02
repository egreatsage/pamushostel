import React, { useEffect, useState ,Fragment} from 'react'
import {AiOutlineArrowRight, AiOutlineClose, AiOutlineHome, AiOutlineMenu, AiOutlineMessage, AiOutlinePieChart, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './dashboard.css'
import Profile from '../../Common/Profile'
import { MdDeleteForever, MdLiving, MdSpaceDashboard } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'
import {FaUsers} from 'react-icons/fa'
import {IoIosArrowDown} from 'react-icons/io'
import {BsHouses} from 'react-icons/bs'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import dbdataservice from '../../Common/Operations'
const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [occupants, setOccupants] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setloading] = useState(true)  
  useEffect   (() => {
    getAllMessages();
  }, []);
  const getAllMessages = async () => {
    const data = await dbdataservice.getAllMessages();
    
    setMessages(data.docs.map((doc) => ({ ...doc.data(),
      id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await dbdataservice.deleteMessage(id);
    getAllMessages();
  };

  useEffect(() => {
    getAllBookings();
  }, []);
  const getAllBookings = async () => {
      const data = await dbdataservice.getAllBookings();
      setBookings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setloading(false)
  }
  const bookingsCount = bookings.length;

  useEffect(() => {
    getAllOccupants();
  }, []);
  const getAllOccupants = async () => {
    const data = await dbdataservice.getAllOccupants();
    setOccupants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}
const occupantsCount = occupants.length;

useEffect(() => {
  getAllRooms();
}, []);
const getAllRooms = async () => {
  const data = await dbdataservice.getAllRooms();
  setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}

const [open, setOpen] = useState(1);
 
const handleOpen = (value) => {
  setOpen(open === value ? 0 : value);
};

const roomCount = rooms.length;
  return (
  <div>
      <div>
      <input type='checkbox' name='' id='sidebar-toggle'/>
      <div className="sidebar border border-r border-gray-800">
        <div className="sidebar-brand">
          <div className="brand-flex">
            <div className="brand-icons flex ">
              <span>Pamus Admin</span>
           
            <label htmlFor='sidebar-toggle' className='md:hidden mt-2 flex ml-14'>
            <span>
              <AiOutlineClose className='cursor-pointer'/>
            </span>
            </label>
         
            </div>
          </div>
        </div>
        <div className=' mt-8'>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link  to='/dashboard'>
            <button>Dashboard</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link  to='/bookings'>
            <button>Bookings</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link  to='/occupants'>
            <button>Occupants</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link  to='/rooms'>
            <button>Rooms</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link  to='/users'>
            <button>Users</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
          <Link  to='/adminprofile'>
            <button>Profile</button>
          </Link>
         </div>
         <div className='p-1 bg-white'>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
          <Link  to='/messagestudent'>
            <button>Mesage Students</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
          <Link  to='/adminprofile'>
            <button>Profile</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
          <Link  to='/adminprofile'>
            <button>Profile</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
          <Link  to='/adminprofile'>
            <button>Profile</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
          <Link  to='/adminprofile'>
            <button>Profile</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
          <Link  to='/adminprofile'>
            <button>Profile</button>
          </Link>
         </div>
        </div>

      </div>
      <div className="main-content">
          <header>
           <div className="menu-toggle">
            <label htmlFor='sidebar-toggle'>
            <span>
              <AiOutlineMenu/>
            </span>
            </label>
           </div>
            <div className='header-icons'>
             <Profile/>
            </div>
          </header>
          <main className='mx-1'>
          <div className="page-header">
            <div>
              <h1>
                Analytics Dashboard
              </h1>
              <small>
                Hostel Details Summary
              </small>
            </div>
            <div>

            </div>
          </div>
          <div className="cards">
            <div className="card-single">
              <div className="card-flex">
                <div className="card-info">
                  <div className="card-head">
                       <span>Bookings</span>
                       <small>Total number of bookings pending</small>
                  </div>
                  <h2>{bookingsCount}</h2>
                 <Link to='/bookings'>
                 </Link>
                </div>
                <div className="card-chart">
                  <span><TbBrandBooking className='text-[indigo]'/> </span>
                </div>
              </div>
            </div>
            <div className="card-single">
              <div className="card-flex">
                <div className="card-info">
                  <div className="card-head">
                       <span>Occupants</span>
                       <small>Total number of Occupants present</small>
                  </div>
                  <h2>{occupantsCount}</h2>
                
                </div>
                <div className="card-chart">
                  <span><FaUsers className='text-[indigo]'/> </span>
                </div>
              </div>
            </div>
            <div className="card-single">
              <div className="card-flex">
                <div className="card-info">
                  <div className="card-head">
                       <span>Rooms</span>
                       <small>Rooms Available</small>
                  </div>
                  <h2>{roomCount}</h2>
                  
                </div>
                <div className="card-chart">
                  <span><BsHouses className='text-[indigo]' /> </span>
                </div>
              </div>
            </div>
          </div>
          <div className="jobs-grid">
            <div className="analytics-card mb-3">
               <div className="analytics-head">
                <h1>Action needed</h1>
                <span><AiOutlineMessage/></span>
               </div>
               <div className="analytics-chart">
                <div className="chart-circle">
                  <h1>74%</h1>
                </div>
                <div className="analytics-note">
                  <small>Use the hover utility class from to change the background color of a data row when hovering over the element with the cursor.</small>
                </div>
               </div>
               <div className="analytics-btn">
                <button>Generate Report</button>
               </div>
            </div>
            <div className="jobs">
              <h3 className='flex items-center gap-4 cursor-pointer'><span>Messages and Notifications</span> <span></span></h3>
            <div className="flex flex-col table-responsive">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
     <div className="bg-white w-full h-screen">
      <div className="bg-[#F1F5F9] w-full">
      {messages.map((doc,index)=>{
             return(
              <Fragment>
      <Accordion open={open === 1}>
        <AccordionHeader className='bg-white' onClick={() => handleOpen(1)}>
        <span className='mx-1'>{doc.fullname}</span>
        
        </AccordionHeader>
        <AccordionBody className='bg-white flex-col flex  '>
      <span>  {doc.messsage}</span>
        <span className='text-gray-900 text-sm italic my-3 underline'>{doc.email}</span>
        </AccordionBody>
      </Accordion>
     
    </Fragment>
   
 )
})}
      </div>
     </div>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </main>
        </div> 
        <label htmlFor="sidebar-toggle" className='body-label'/>
    </div>
   
  </div>
  )
}

export default Dashboard