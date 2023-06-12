import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../Common/UserAuthContext";
import { Link} from "react-router-dom";
import { AiFillEdit, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Profile from "../../Common/Profile";
import {MdAdminPanelSettings, MdBedroomParent, MdOutlineDeleteForever, MdSpaceDashboard } from "react-icons/md";
import {TbBrandBooking} from 'react-icons/tb'
import { db } from '../../Common/dbconfig';
import {FaUsers} from 'react-icons/fa'
import { collection, getDocs, doc, setDoc, getDoc,addDoc, deleteDoc } from 'firebase/firestore';
import { useDownloadExcel } from "react-export-table-to-excel";
import dbdataservice from '../../Common/Operations'
const Rooms = ({ id,setRoomId }) => {
  const { user } = useUserAuth();
  const [roomNo, setRoomNo] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');
  const [rooms, setRooms] = useState([]);
  let userId = user ? user.uid : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        roomNo,
        category,
        price,
        gender,
        userId,

    }
    try {
        await addDoc(collection(db,'Rooms'), formData )
        alert('Successfull')
    }   catch (error) {
        alert(error)
    } 
    }

    useEffect(() => {
      getAllRooms();
    }, []);
    const getAllRooms = async () => {
      try {
        const data = await dbdataservice.getAllRooms();
        setRooms(data.docs.map((doc) => ({ ...doc.data(),
          id: doc.id })));
      } catch (err) {
        alert(err)
    }; 
  }
    const deleteHandler = async (id) => {
     try {
      await dbdataservice.deleteRoom(id);
      getAllRooms();
     } catch (error) {
       alert(error)
     }
    };
  

  return (
       <div>
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
        </div>
           <table>
      <thead>
        <tr>
          <th>Room No</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      {rooms.map((doc,index)=>{
      <tbody>
      
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{doc.roomNo}</td>
            <td>{doc.category}</td>
            <td>{doc.price}</td>
            <td>{doc.rooms}</td>
            <td>
            <Link to='/rooms'>
            <AiFillEdit className='text-[orange] text-2xl cursor-pointer'  onClick={(e) =>
                   getRoomId(doc.id)}/>
            </Link>
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <MdOutlineDeleteForever onClick={(e) => 
              deleteHandler(doc.id)} className='text-[red] text-2xl cursor-pointer'/>
            </td>
          </tr>
    
      </tbody>
      })}
    </table>
  
       </div>
  )
}

export default Rooms