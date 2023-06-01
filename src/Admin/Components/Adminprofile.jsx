import { collection,getDocs } from 'firebase/firestore';
import React from 'react'

const Adminprofile = () => {
    const getStudentData = async (bookingId) => {
        try {
          const bookingRef = collection(db, 'Bookings').doc(bookingId);
          const bookingSnapshot = await getDocs(bookingRef)
      
          if (bookingSnapshot.exists) {
            const bookingData = bookingSnapshot.data();
            const { fullname, gender } = bookingData;

            console.log('Booking ID:', bookingId);
            console.log('Name:', fullname);
            console.log('Gender:', gender);
      
            // Call a function to connect the student data with the "Rooms" collection
            connectStudentToRoom(bookingId, fullname, gender);
          } else {
            console.log('No booking found with ID:', bookingId);
          }
        } catch (error) {
          console.log('Error retrieving student data:', error);
        }
      };
      const connectStudentToRoom = async (studentId, fullname, gender) => {
        try {
          const roomRef = collection(db,'Rooms').doc(studentId);
          // Perform necessary operations on the "Rooms" collection
          // For example, updating fields to associate the student with the room
          await roomRef.update({ studentId, fullname, gender });
      
          console.log('Student connected to room successfully');
        } catch (error) {
          console.log('Error connecting student to room:', error);
        }
      };
      
  return (
    <div>Adminprofile</div>
  )
}

export default Adminprofile