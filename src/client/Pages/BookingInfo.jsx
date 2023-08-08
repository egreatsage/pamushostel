import { useToast } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc,addDoc, getDocs, orderBy, query, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import {AiFillDelete,AiFillEdit, AiFillEye} from  'react-icons/ai'
import Loader from '../../Loader';
import { useNavigate } from 'react-router-dom';
const BookingInfo = () => {
  const [checkindate, setCheckindate] = useState('');
  const [checkoutdate, setCheckoutdate] = useState('');
  const [sharingtype, setSharingType] = useState('');
  const [userId, setUserId] = useState('');
  const [withFood, setWithFood] = useState(true);
  const [price, setPrice] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const calculatePrice = (type) => {
    let basePrice = 0;
    switch (type) {
      case 'Single room':
        basePrice = 5000;
        break;
      case '2 Sharing':
        basePrice = 4000;
        break;
      case '3 Sharing':
        basePrice = 3000;
        break;
      case '4 Sharing':
        basePrice = 2000;
        break;
      default:
        basePrice = 0;
    }
    return withFood ? basePrice + 2000 : basePrice;
  };

  useEffect(() => {
    const calculatedPrice = calculatePrice(sharingtype);
    setPrice(calculatedPrice);
  }, [sharingtype, withFood]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBooking) {
        await updateDoc(doc(db, 'Bookings', editingBooking.id), {
          checkindate,
          checkoutdate,
          sharingtype,
          price,
          withFood,
          userId,
        });
        fetchBookings();
        toast({
          description: 'Updated successfully',
          status: 'success',
          position: 'top',
          duration: 3500,
        });
      } else {
        await addDoc(collection(db, 'Bookings'), {
          checkindate,
          checkoutdate,
          sharingtype,
          price,
          withFood,
          userId,
        });
        fetchBookings();
        toast({
          description: 'Added successfully',
          status: 'success',
          position: 'top',
          duration: 3500,
        });
      }

      // Clear form inputs after submission
      setCheckindate('');
      setCheckoutdate('');
      setSharingType('');
      setWithFood(true);
      setPrice(0);
      setUserId('');
    } catch (error) {
      toast({
        description: `${error}`,
        status: 'error',
        duration: 9000,
        position: 'top',
      });
    }
  };

  const fetchBookings = async () => {
    const bookingsRef = collection(db, 'Bookings');
    const bookingsSnapshot = await getDocs(bookingsRef);
    const bookingsData = bookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBookings(bookingsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = (id) => {
    const bookingToEdit = bookings.find((booking) => booking.id === id);
    if (bookingToEdit) {
      setEditingBooking(bookingToEdit);

      setCheckindate(bookingToEdit.checkindate);
      setCheckoutdate(bookingToEdit.checkoutdate);
      setSharingType(bookingToEdit.sharingtype);
      setWithFood(bookingToEdit.withFood);
      setPrice(bookingToEdit.price);
      setUserId(bookingToEdit.userId);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Bookings', id));
      toast({
        description: 'Deleted successfully',
        status: 'success',
        position: 'top',
      });
      fetchBookings();
    } catch (error) {
      toast({
        description: `${error}`,
        status: 'error',
        duration: 9000,
        position: 'top',
      });
    }
  };

  const navigate = useNavigate();  return (
   <div>
      <div>
       <h1 className='text-center flex text-xl ml-5 font-semibold my-7'>Booking information</h1>
       
         <div className=''>
         <div className='flex items-center justify-center h-auto md:h-screen md:mt-0'>
         <form className='' onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-2 gap-3'>
            <div className='flex flex-col'>
              <label>Checkin date</label>
              <input
                className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
                type='date'
                placeholder='Enter checkin date'
                value={checkindate}
                onChange={(e) => setCheckindate(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <label>Checkout date</label>
              <input
                className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
                type='date'
                value={checkoutdate}
                onChange={(e) => setCheckoutdate(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label>Choose your Room Category</label>
              <select
                className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
                value={sharingtype}
                onChange={(e) => setSharingType(e.target.value)}
              >
                <option disabled value=''>
                  Select type of room
                </option>
                <option value='Single room'>Single room</option>
                <option value='2 Sharing'>2 Sharing</option>
                <option value='3 Sharing'>3 Sharing</option>
                <option value='4 Sharing'>4 Sharing</option>
              </select>
            </div>

            <div>
            <label>Food Option:</label>
            <div className='flex pt-6 items-center'>
              <label className='mr-8'>
                <input
                  type='radio'
                  value='noFood'
                  checked={!withFood}
                  onChange={() => setWithFood(false)}
                />
                No Food
              </label>
              <label className='mr-5'>
                <input 
                  type='radio'
                  value='withFood'
                  checked={withFood}
                  onChange={() => setWithFood(true)}
                />
                With Food <span className='font-bold'>(+ Ksh 2000)</span>
              </label>
            </div>
            </div>
 
           
                 <div>
                 <h1 className='text-xl'>Total Amount to be paid</h1>
            {price > 0 && (
              <p className='font-semibold text-md underline'>
               
                Price: Ksh <span className='font-extrabold text-lg'>{price}</span> per head / per month
              </p>
            )}
                 </div>
          </div>
         <div className='flex justify-end'>
         <button className='bg-gray-700 mt-5 text-white font-bold px-8 py-2 rounded-[10px]' type='submit'>Submit</button>
         </div>
        </form>
          </div>
         </div>
      
    </div>
     <div>

</div>
<div class="flex flex-col overflow-x-auto mb-8">
  <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto">
        {loading?(<Loader/>):(
          <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">#</th>
              <th scope="col" class="px-6 py-4">checkindate</th>
              <th scope="col" class="px-6 py-4">checkoutdate</th>
              <th scope="col" class="px-6 py-4">sharing</th>
              <th scope="col" class="px-6 py-4">withFood</th>
              <th scope="col" class="px-6 py-4">price</th>
              <th scope="col" class="px-6 py-4">userId</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id} class="border-b dark:border-neutral-500">
                <td  class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                <td class="whitespace-nowrap px-6 py-4">{booking.checkindate}</td> 
                <td class="whitespace-nowrap px-6 py-4">{booking.checkoutdate}</td>
                <td class="whitespace-nowrap px-6 py-4">{booking.sharingtype}</td>
                <td class="whitespace-nowrap px-6 py-4">{booking.withFood ? 'With Food' : 'No Food'}</td>
                <td class="whitespace-nowrap px-6 py-4">{booking.price}</td>
                <td class="whitespace-nowrap px-6 py-4">{booking.userId}</td>
                <td class="whitespace-nowrap flex px-6 gap-3  py-4">
                <AiFillEye className='text-2xl cursor-pointer text-green-600' onClick={() => navigate(`/userview/${booking.id}`)}/>
                  <AiFillEdit className='text-2xl cursor-pointer text-orange-800' onClick={() => handleEdit(booking.id)}/>
                  <AiFillDelete className='text-2xl cursor-pointer text-red-600' onClick={() => handleDelete(booking.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      
      </div>
    </div>
  </div>
</div>
<div>

</div>
   </div>
  )
}

export default BookingInfo