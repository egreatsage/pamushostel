import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where, startAt, endBefore } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import Loader from '../../Loader';
import { useToast } from '@chakra-ui/react';

const Userview = () => {
  const { userId } = useParams();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [firstName, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [staytime, setStaytime] = useState('')
  const [roomno, setRoomno] = useState('')

  useEffect(() => {
    const fetchUserAndBooking = async () => {
      try {
        const userRef = doc(db, 'RegisteredUsers', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data());
    
          const bookingQuery = query(
            collection(db, 'Bookings'),
            where('userId', '==', userId)
          );
          const bookingsSnapshot = await getDocs(bookingQuery);
          const bookingDocs = bookingsSnapshot.docs;
          console.log('Booking Docs:', bookingDocs); // Log the bookingDocs
    
          if (bookingDocs.length > 0) {
            const bookingData = bookingDocs[0].data();
            console.log('Booking Data:', bookingData); // Log the bookingData to verify its structure
            setFirstname(bookingData.firstname);
            setLastname(bookingData.lastname);
            setPhonenumber(bookingData.phonenumber);
            setStaytime(bookingData.staytime);
            setRoomno(bookingData.roomno);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRooms = async () => {
      try {
        if (!user?.gender) {
          setIsLoading(false);
          return;
        }

        let startLetter, endLetter;
        if (user.gender === 'Male') {
          startLetter = 'a';
          endLetter = 'b';
        } else if (user.gender === 'Female') {
          startLetter = 'b';
          endLetter = 'c';
        } else {
          // For other genders, just set the roomNumbers to an empty array
          setRoomNumbers([]);
          setIsLoading(false);
          return;
        }

        const roomQuery = query(
          collection(db, 'Rooms'),
          where('roomno', '>=', startLetter),
          where('roomno', '<', endLetter)
        );

        const roomSnapshot = await getDocs(roomQuery);
        const rooms = roomSnapshot.docs.map(doc => doc.data().roomno);
        setRoomNumbers(rooms);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndBooking();
    fetchRooms();
  }, [userId, user?.gender]);

  if (!user || isLoading) {
    return <div>
      <Loader/>
    </div>;
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try { 
    } catch (error) {
      toast({
      })
    }
  }

  return (
    <div>
      
      {/* UserInfo */}

      <div>
      <h1>User Information</h1>
      <p>Firstname: {user.firstname}</p>
      <p>Lastname: {user.lastname}</p>
      <p>Gender: {user.gender}</p>
      <p>Phone Number: {user.phonenumber}</p>
      <p>School: {user.school}</p>
      <p>Staytime: {user.staytime}</p>
      <p>Staytime: {user.userId}</p>
      </div>

     {/* booking info */}

    <div className='mt-8'>
     <h1>Booking  Information</h1>
      <p>check-in date:{user.checkindate}</p>
      <p>check-out date: {user.checkoutdate}</p>
      <p>Email:{user.email} </p>
      <p>Staytime:{user.staytime} </p>
      <p>Total Price: {user.price} </p>
      <p>userId:{user.userId} </p>
     </div> 
      {/* <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">firstname</label>
          <input type="text"
          value={user.firstname}
          onChange={e=> setFirstname(e.target.value)}
           />
          <label htmlFor="lastName">LastName:</label>
          <input type='text'
            value={user.lastname}
            onChange={e=> setLastname(e.target.value)}
          />
          <label htmlFor="phonenumber">phonenumber</label>
          <input type="text" 
            value={user.phonenumber}
            onChange={e=> setPhonenumber(e.target.value)}
          />
          <label htmlFor="Staytime">staytime:</label>
          <input type='text'
            value={user.staytime}
            onChange={e=> setStaytime(e.target.value)}
            
          />
           <select
            onChange={e=> setRoomno(e.target.value)} >
        <option disabled>Select Gender</option>
        {roomNumbers.map(roomno => (
          <option key={roomno}>{roomno}</option>
        ))}
      </select>
        </form>
      </div> */}
    </div>
  );
};

export default Userview;
