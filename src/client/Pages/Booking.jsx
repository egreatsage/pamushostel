
import React, { useState, useEffect, useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../Common/UserAuthContext';
import Navbar from '../Components/Navbar';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import { useToast } from '@chakra-ui/react';


const Booking = () => {
  const {user} = useUserAuth();
  const [checkindate, setCheckindate] = useState('');
  const [checkoutdate, setCheckoutdate] = useState('');
  const [sharingtype, setSharingType] = useState('');
  const [withFood, setWithFood] = useState(true); // State to track food option
  const [price, setPrice] = useState(0); // State to hold the calculated price

  let userId = user ? user.uid : null;
  let emailaddress = user ? user.email : null;
  const navigate = useNavigate();
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

    // Add 2000 to the base price if "with food" is selected, otherwise return the base price only
    return withFood ? basePrice + 2000 : basePrice;
  };
  useEffect(() => {
    // Calculate the price when the sharing type or food option changes
    const calculatedPrice = calculatePrice(sharingtype);
    setPrice(calculatedPrice);
  }, [sharingtype, withFood]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const formData = {
        checkindate,
        checkoutdate,
        sharingtype,
        withFood,
        price,
        userId,
        emailaddress,
        createdAt: new Date().toISOString()
      }
      await addDoc(collection(db, 'Bookings'), formData);
        resetForm(); // Reset the form after submission
        toast({
          description: 'Booking was successfull,please wait for a reply from the hostel',
          status:'success',
          duration: 9000,
          position:'top'
         })
    } catch (error) {
      alert(error)
    }
   
  }
  const resetForm = () => {
    setCheckindate('');
    setCheckoutdate('');
    setSharingType('');
    setWithFood('');
    setPrice('');

  };

  
  return (
    <div>
      <Navbar/>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-center flex text-2xl font-semibold my-7'>Book with us</h1>
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
  );
};
export default Booking;
