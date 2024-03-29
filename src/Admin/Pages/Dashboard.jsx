import React, { useEffect, useState ,Fragment} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './dashboard.css'
import Profile from '../../Common/Profile'
import { MdAdminPanelSettings, MdBedroomParent,MdOutlineDeleteForever, MdSpaceDashboard } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'
import {FaUsers} from 'react-icons/fa'
import {BsHouses} from 'react-icons/bs'
import {Accordion,AccordionHeader,AccordionBody,} from "@material-tailwind/react";
import dbdataservice from '../../Common/Operations'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Common/dbconfig'
const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [occupants, setOccupants] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [allotments, setAllotments] = useState([]); 
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

const [open, setOpen] = useState(0);
 
const handleOpen = (value) => {
  setOpen(open === value ? 0 : value);
};

const roomCount = rooms.length;

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Occupants'));
    const data = querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    setAllotments(data);
  } catch (error) {
    alert(error);
  }
};

useEffect(() => {
  fetchData();
}, []);


const AllotmentCount = allotments.length
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
        <div className='md:mt-20 mt-8'>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2" to='/dashboard'>
             <span><MdSpaceDashboard className="text-xl"/></span>
            <button>Dashboard</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2" to='/bookings'>
          <span className="text-xl"><TbBrandBooking/></span>
            <button>Bookings</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/occupants'>
          <span className="text-xl"><FaUsers/></span>
            <button>Occupants</button>
          </Link>
         </div>
        
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/rooms'>
          <span className="text-xl"><MdBedroomParent/></span>
            <button>Rooms</button>
          </Link>
         </div>

         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/users'>
          <span className="text-xl"><FaUsers/></span>
            <button>Users</button>
          </Link>
         </div>
         <div className='my-8 m-8  hover:font-semibold'>
         <Link className="flex items-center gap-2 " to='/miscelleanous'>
          <span className="text-xl"><MdAdminPanelSettings/></span>
            <button>Miscellenous</button>
          </Link>
         </div>
        </div>

      </div>
      <div className="main-content">
          <header className='shadow-md'>
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
            <Link to={'/Bookings'} >
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
            </Link>
            
            <Link to={'/occupants'}>
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
            </Link>
            <Link to={'/rooms'}>
            <div className="card-single">
              <div className="card-flex">
                <div className="card-info">
                  <div className="card-head">
                       <span>Rooms</span>
                       <small>Rooms Available</small>
                    
                  </div>
                  <div className='text-white'>r</div>
                  <h2>{roomCount}</h2>
                  
                </div>
                <div className="card-chart">
                  <span><BsHouses className='text-[indigo]' /> </span>
                </div>
              </div>
            </div>
              </Link>
           
          </div>
          <div className="jobs-grid">
            <div className="analytics-card my-4 mx-2 pr-2">
               <div className="analytics-head">
                <h1 className='text-md font-semibold '>Active hostellers</h1>
                <span>({AllotmentCount})</span>
               </div>
               <div>
               {allotments.map((allotment,index)=>(
              <div key={allotment.docId} className=" overflow-hidden flex justify-between gap-3 py-2 border-t border-b">
              <div>
                <h1>{allotment.fullname}</h1>
              </div>
              <div>
                <h1 className='text-sm italic'>Room: {allotment.roomno}</h1>
              </div>
              </div>
              ))}
               </div>
               <div className="analytics-btn">
                
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
  
      {messages.map((doc)=>{
             return(
              <Fragment>
      <Accordion open={open === 1} className=' border-b border-t border-gray-200 '>
        <AccordionHeader className='bg-white flex text-md font-normal text-black justify-between' onClick={() => handleOpen(1)}>
        <span className='mx-1 text-gray-700 text-md'>{doc.name}</span>
        <span className='mx-1 text-sm italic'>{doc.createdAt}</span>
        
        </AccordionHeader>
        <AccordionBody className='bg-white flex-col flex  '>
      <span>  {doc.message}</span>
        <span className='text-gray-900 text-sm italic my-3 underline'>{doc.email}</span>
        <div className='justify-end flex bg-white pr-4'>
      <MdOutlineDeleteForever onClick={(e) => 
              deleteHandler(doc.id)} className='text-[red] text-2xl cursor-pointer'/>
      </div>
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