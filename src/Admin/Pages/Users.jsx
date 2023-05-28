import React, { useState, useEffect } from 'react';
import dbdataservice from '../../Common/Operations';
import { MdOutlineDeleteForever } from 'react-icons/md';

const Users = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const snapshot = await dbdataservice.getAllRooms();
      const roomData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleRoomSelect = (e) => {
    const { value } = e.target;
    setSelectedRoom(value);

    // Check if the room is already selected
    const selectedRoomCount = rooms.filter((room) => room.id === value).length;
    if (selectedRoomCount >= 2) {
      deleteRoom(value);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await dbdataservice.deleteRoom(roomId);
      console.log('Room deleted successfully!');
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };
  const [searchedVal, setSearchedVal] = useState("")

  return (
    <div>
      <label htmlFor="roomSelect">Select a Room:</label>
      <select id="roomSelect" value={selectedRoom} onChange={handleRoomSelect}>
        <option value="">Select a room</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.roomno}
          </option>
        ))}
      </select>
      {selectedRoom && <p>Selected Room ID: {selectedRoom}</p>}

      <div className='bg-white w-full overflow-x-auto'>
                <table  className=''>
                     <thead className='bg-white border-b'>
                     <tr className=''>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              SNO
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
            roomno
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Category
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Gender
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Pricing
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-1 text-center">
              Edit
            </th>
            <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-center">
              Delete
            </th>
            </tr>
                     </thead>
                     {rooms && rooms.filter((row) =>
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
            {doc.roomno}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.gender}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {doc.category}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {doc.pricing}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {/* <Link to='/rooms'>
          <AiFillEdit  onClick={(e) =>
                 setRoomId(doc.id)} className='text-xl text-[brown]'/>
          </Link> */}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <MdOutlineDeleteForever  onClick={(e) => 
            deleteHandler(doc.id)} className='text-[red] text-2xl cursor-pointer'/>
            </td>
          </tr>
          </tbody>
           )
          })}
          </table>
         </div>
    </div>
  );
};

export default Users;
