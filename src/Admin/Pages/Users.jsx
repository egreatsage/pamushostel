import React, { useEffect, useState } from 'react';
import { db } from '../../Common/dbconfig';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { useUserAuth } from '../../Common/UserAuthContext';
import Allocate from './Allocate';

const Users = () => {
  const { user } = useUserAuth();
  const [roomNo, setRoomNo] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  let userId = user ? user.uid : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'Therooms'), {
        roomNo,
        category,
        price,
        gender,
        userId,
      });

      const roomDocRef = doc(db, 'Therooms', docRef.id);
      const userDocRef = doc(db, 'Therooms', userId);

      await setDoc(userDocRef, {
        room: roomDocRef,
      });

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
    const userDocRef = doc(db, 'Therooms', userId);
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

  useEffect(() => {
    fetchRooms();
    fetchUserRooms();
  }, [userId]);

  return (
    <div>
      {/* ... */}

      <form onSubmit={handleSubmit}>
        {/* ... */}
        <div>
          <label htmlFor="roomNo">Room No:</label>
          <select
            id="roomNo"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            required
          >
            <option value="">Select Room No</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.roomNo}>
                {room.roomNo}
              </option>
            ))}
          </select>
        </div>
        {/* ... */}
        
      </form>

      {/* Display user's room */}
      <h2>User's Room:</h2>
      {userRooms.map((room) => (
        <div key={room.id}>
          <p>{room.roomNo}</p>
          <p>{room.category}</p>
          <p>{room.price}</p>
          <p>{room.gender}</p>
        </div>
      ))}

      {/* ... */}
    </div>
  );
};

export default Users;
