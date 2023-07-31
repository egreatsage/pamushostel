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
import moment from 'moment';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import UserInfo from './UserInfo';
const StudentProfile = () => {
    const { user,} = useUserAuth();
    const [occupants, setOccupants] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    let userId = user.uid;
      useEffect(() => {
        getAllOccupants();
      }, []);
      const getAllOccupants = async () => {
        const data = await dbdataservice.getAllOccupants();
        setOccupants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
      const calculateDateDifference = (checkInDate, checkOutDate) => {
        const start = moment(checkInDate);
        const end = moment(checkOutDate);
        const duration = moment.duration(end.diff(start));
        const days = Math.floor(duration.asDays());
        return days;
      };

   
     
    
      useEffect(() => {
        if (user) {
          fetchUserInfo();
        }
      }, [user]);
    
      const fetchUserInfo = async () => {
        try {
          const q = query(collection(db, 'ActiveUsers'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.size === 1) {
            // Assuming there's only one document matching the UID
            const doc = querySnapshot.docs[0];
            setUserInfo(doc.data());
          } else {
            // Handle error or show appropriate message if the user data is not found
            setUserInfo(null);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          // Handle error or show appropriate message
          setUserInfo(null);
        }
      };
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
      </MenuList>
    </Menu> 
           </div>
        </div>
        <div>
             
            <div>
              <UserInfo/>
            </div>
        <div ref={componentRef} className="">
        <h1 className='text-xl ml-2 font-semibold text-gray-700 rounded-sm '>Room Information</h1>
        {occupants.length > 0 ?( occupants?.filter((room) => room.userId === userId).map((doc, index) => {
        return(
        <div className='bg-gray-50 py-9 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          <div className='flex gap-2 ml-3'>
            <h1>Room Number:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{doc.roomno}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>Check - in Date:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{doc.allocateddate}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>Check - out Date:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{doc.checkoutdate}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>Phone Number:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{userInfo.phonenumber}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>Period:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{calculateDateDifference(doc.allocateddate, doc.checkoutdate)} days remaining</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
        </div>
        )})):(
        <p>loading</p>
        )}
        </div>
        </div>
    </div>
   </div>
  )
}

export default StudentProfile