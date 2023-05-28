import { Menu, MenuHandler, MenuList, Tooltip } from '@material-tailwind/react'
import React,{useState,useEffect, useRef} from 'react'
import {useUserAuth} from '../../Common/UserAuthContext'
import dbdataservice from '../../Common/Operations';
import {FaFileDownload} from 'react-icons/fa'
import { useReactToPrint} from 'react-to-print';
import { AiOutlineMore} from 'react-icons/ai'
import { Link} from 'react-router-dom'
import Profile from '../../Common/Profile'
import Navbar from '../Components/Navbar'
const StudentProfile = () => {
    const { user,} = useUserAuth();
    const [bookings, setBookings] = useState([]);
    const [occupants, setOccupants] = useState([]);
    let userId = user.uid;
    useEffect(() => {
        getAllBookings()
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
        if (data === null) {
          // Display message if data is null
          console.log('Data is null');
        } else {
          setOccupants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      };

    const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
  return (
   <div>
    <div>
        <Navbar/>
    </div>
     <div className='mt-20 overflow-x-hidden'>
        
        <div className="flex justify-between">
           <div>

           </div>

           <div className='flex gap-4'>
          
           <Profile/>
           
            <Menu>
      <MenuHandler>
          <button>
          <AiOutlineMore className='lead leading-8 top-0 text-2xl extrabold cursor-pointer'/>
          </button>
      </MenuHandler>
      <MenuList className='flex flex-col mt-3'>
      <h1 className='mt-3 text-black text-center mb-3'>More Actions</h1>
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/booking'>Book A Room</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/rules'> Rules/Regulations</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/notices'> Notices</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/booking'>Contact Landlord</Link>
      
      <Link className='my-2 bold tracking-wide ml-3 hover:bg-gray-100 px-2 rounded-md py-1 text-black' to='/booking'>Connect with hostelmates</Link>
      </MenuList>
    </Menu> 
           </div>
        </div>
        <div>
            <div className="flex justify-end mr-5 mt-3 my-4">
                <Tooltip content='Print Document' placement='bottom'>
                   <button className='bg-none border-none'>
                   <FaFileDownload className='cursor-pointer text-[green]' onClick={handlePrint}/>
                </button>
                </Tooltip>
    
            </div>
        <div ref={componentRef} className="">
        <h1 className='text-center bold md:text-2xl tracking-wide text-md'>Hosteller Information</h1>
        {occupants?.filter((room) => room.userId === userId).map((doc, index) => {
        return(
        <div className='shadow-md md:mx-8 border border-shadow-[black] h-full my-12  rounded-md'>
         <div className='md:flex my-5 mx-1 items-center sm:flex md:border md:shadow-sm  '>
        <div  className='md:w-[250px] w-full flex items-center md:border-r-gray-400 md:border-r text-xl md:p-3 p-2  font-semibold '>
        <h1>Room Information</h1>
        </div>
         <div className=" md:p-12 py-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">   
            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Room Number</div>
              <div className='md:underline my-1 text-sm text-gray-700 '>{doc.roomno}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Check - in Date</div>
              <div className='md:underline my-1 text-sm text-gray-700 '>{doc.checkindate}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Check - out Date</div>
              <div className='md:underline my-1 text-sm text-gray-700 '>{doc.checkoutdate}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Period</div>
              <div className='md:underline my-1 text-sm  text-gray-700 '>{doc.period}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>
        
           </div>

         </div>
         <div className='md:flex my-5 mx-1 items-center sm:flex md:border md:shadow-sm  '>
        <div  className='md:w-[250px] w-full flex items-center md:border-r-gray-400 md:border-r text-xl md:p-3 p-2  font-semibold '>
        <h1>Personal Information</h1>
        </div>
         <div className=" md:p-12 py-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">   
            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Name</div>
              <div className='md:underline my-1 text-sm text-gray-700 '>{doc.fullname}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Gender</div>
              <div className='md:underline my-1 text-sm text-gray-700 '>{doc.gender}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Contact</div>
              <div className='md:underline my-1 text-sm text-gray-700 '>{doc.contact}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> School</div>
              <div className='md:underline my-1 text-sm  text-gray-700 '>{doc.institution}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Parent/Guardian Name</div>
              <div className='md:underline my-1 text-sm  text-gray-700 '>{doc.pgname}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>

            <div className='md:flex gap-1 md:mr-6 mb-2 md:ml-0  ml-4'>
             <div className='md:font-semibold font-normal text-black md:text-gray-800 mr-2'> Parent/Guardian Contact</div>
              <div className='md:underline my-1 text-sm  text-gray-700 '>{doc.pgcontact}</div>
            </div>
            <div className="divider mx-3 rounded-lg mb-3 md:hidden"></div>
        
           </div>
         </div>
        </div>
       )})}
        </div>
        <div>

        </div>
        </div>
      
    </div>
   </div>
  )
}

export default StudentProfile