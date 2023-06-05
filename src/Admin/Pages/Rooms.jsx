import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../Common/UserAuthContext";
import { Link} from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Profile from "../../Common/Profile";
import {MdAdminPanelSettings, MdBedroomParent, MdSpaceDashboard } from "react-icons/md";
import {TbBrandBooking} from 'react-icons/tb'
import { db } from '../../Common/dbconfig';
import {FaUsers} from 'react-icons/fa'
import { collection, getDocs, doc, setDoc, getDoc,addDoc } from 'firebase/firestore';
import { useDownloadExcel } from "react-export-table-to-excel";
const Rooms = ({ id,setRoomId }) => {
  const { user } = useUserAuth();
  const [roomNo, setRoomNo] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editRoomId, setEditRoomId] = useState('');
  let userId = user ? user.uid : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // Update existing room
        const roomDocRef = doc(db, 'Therooms', editRoomId);
        await updateDoc(roomDocRef, {
          roomNo,
          category,
          price,
          gender,
        });
        setEditMode(false);
        setEditRoomId('');
      } else {
        // Add new room
        const docRef = await addDoc(collection(db, 'users'), {
          roomNo,
          category,
          price,
          gender,
          userId,
        });
        const roomDocRef = doc(db, 'Therooms', docRef.id);
        const userDocRef = doc(db, 'hello', userId);
        await setDoc(userDocRef, {
          room: roomDocRef,
        });
      }

      setRoomNo('');
      setCategory('');
      setPrice('');
      setGender('');

      console.log('Room data saved to Firestore and linked to user successfully!');
    } catch (error) {
      console.error('Error saving room data:', error);
    }
  };

  const fetchRooms = async () => {
    const roomCollectionRef = collection(db, 'Therooms');
    const roomSnapshot = await getDocs(roomCollectionRef);
    const roomData = roomSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRooms(roomData);
  };

  const fetchUserRooms = async () => {
    const userDocRef = doc(db, 'hello', userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const roomRef = userData.room;
      if (roomRef) {
        const roomDocSnap = await getDoc(roomRef);
        if (roomDocSnap.exists()) {
          setUserRooms([{ ...roomDocSnap.data(), id: roomDocSnap.id }]);
        }
      }
    }
  };
  const handleEdit = (room) => {
    setEditMode(true);
    setEditRoomId(room.id);
    setRoomNo(room.roomNo);
    setCategory(room.category);
    setPrice(room.price);
    setGender(room.gender);
  };

  const handleDelete = async (roomId) => {
    try {
      // Delete the room document
      const roomDocRef = doc(db, 'Therooms', roomId);
      await deleteDoc(roomDocRef);

      // Update the user document to remove the room reference
      const userDocRef = doc(db, 'hello', userId);
      await updateDoc(userDocRef, {
        room: null,
      });

      console.log('Room data deleted from Firestore and user reference updated successfully!');
    } catch (error) {
      console.error('Error deleting room data:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchUserRooms();
  }, [userId]);


  const [searchedVal, setSearchedVal] = useState("")
  const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Occupants table',
        sheet: 'Occupants'
    })
  return (
  <div>
   
     <div className="flex justify-end w-8">
   
     </div>

   
      <div>
      <input type='checkbox' name='' id='sidebar-toggle'/>
      <div className="sidebar">
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
        <div className="sidebar-main">
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
         <Link className="flex items-center gap-2 " to='/adminprofile'>
          <span className="text-xl"><MdAdminPanelSettings/></span>
            <button>Profile</button>
          </Link>
         </div>
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
          <main>
          <div className='overflow-y-auto  '>
         <h1 className="text-center tracking-wide md:text-2xl text-xl font-bold mb-3  my-3">Room Management</h1>
          <div>
    <form className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2" onSubmit={handleSubmit}>
     <div className="flex flex-col mx-2 md:mx-0">
       <label htmlFor="roomNo">Room No:</label>
       <input
       className='border border-gray-700 py-1 rounded-md px-2 '
         type="text"
         id="roomNo"
         value={roomNo}
         onChange={(e) => setRoomNo(e.target.value)}
         required
       />
     </div>
     <div className="flex flex-col mx-2 md:mx-0">
       <label htmlFor="category">Category:</label>
       <input
       className='border border-gray-700 rounded-md py-1 px-2'
         type="text"
         id="category"
         value={category}
         onChange={(e) => setCategory(e.target.value)}
         required
       />
     </div>
     <div className="flex flex-col mx-2 md:mx-0">
       <label htmlFor="price">Price:</label>
       <input
       className='border border-gray-700 rounded-md py-1 px-2'
         type="text"
         id="price"
         value={price}
         onChange={(e) => setPrice(e.target.value)}
         required
       />
     </div>
     <div className="flex flex-col mx-2 md:mx-0">
       <label htmlFor="gender">Gender:</label>
       <input
       className='border border-gray-700 rounded-md py-1 px-2'
         type="text"
         id="gender"
         value={gender}
         onChange={(e) => setGender(e.target.value)}
         required
       />
     </div>
     <button className=' rounded-md my-3 mt-5 bg-gray-400 text-white px-4 py-2 mx-4' type="submit">Add Room</button>
   </form>
     <div>
     <div class="overflow-hidden">
        <table ref={tableRef} class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                RoomNo
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Category
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Edit
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Delete
              </th>
            </tr>
          </thead>
          {rooms.filter((row) =>
         !searchedVal.length || row.roomno
           .toString()
           .toLowerCase()
           .includes(searchedVal.toString().toLowerCase()) 
       ).map((doc,index)=>{
             return(
          <tbody>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.roomNo}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.category}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {doc.price}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.gender}
              </td>
              <td class="text-sm hidden text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {doc.userId}
              </td>
              <button onClick={() => handleEdit(rooms)}>Edit</button>
              {/* <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <Link to='/addoccupant'>
            <AiFillEdit className='text-[orange] text-2xl cursor-pointer'  onClick={(e) =>
                   getOccupantId(doc.id)}/>
            </Link>
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <MdOutlineDeleteForever onClick={(e) => 
              deleteHandler(doc.id)} className='text-[red] text-2xl cursor-pointer'/>
              </td> */}
            </tr>
         
          
              
          </tbody>
          )
        })}
        </table>
      </div>
     </div>
   <div>
   
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

export default Rooms