import React, { useState,useEffect } from 'react'
import { Input} from "@material-tailwind/react";
import EmployeeDataService from '../../Operations';
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav';
import { toast } from 'react-toastify';
const BookingsAllocate = ({ id, setBookingId ,setOccupantI}) => {
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [PNumber, setPNumber] = useState('');
  const [Gender, setGender] = useState('');
  const [Age, setAge] = useState('');
  const [RoomNo, setRoomNo] = useState('');
  const [EntryDate, setEntryDate] = useState('');
  const [ExitDate, setExitDate] = useState('');
  const [userId, setuserId] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (FName === "" || LName === "" || Gender === "" || RoomNo === "" || EntryDate === "" || ExitDate === ""    ) {
     toast.success('Fill in all spaces')
      return;
    }
    const newOccupant= {
      FName,LName,Gender,Age,PNumber,RoomNo,EntryDate,ExitDate,userId  
    };
    try {
        await EmployeeDataService.addOccupant(newOccupant);
        setTimeout(() => {
          navigate('/Occupants');
      }, 3000);
       toast.success('room added successfully')
    } catch (err) {
      toast.error('problem adding room')
    }  
  };
  const editHandler = async () => {
    toast.success('room edited successfully')
    try {
      const docSnap = await EmployeeDataService.getBooking(id);
      setFName(docSnap.data().FName);
      setLName(docSnap.data().LName);
      setGender(docSnap.data().Gender);
      setPNumber(docSnap.data().PNumber);
      setAge(docSnap.data().Age);
      setuserId(docSnap.data().userId);
    } catch (err) {
      toast.error('problem editing a room')
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }   //eslint-disable-next-line
  }, [id]);
  return (
    <div>
      <div><Nav/></div>
      <div className='pb-9 mb-9 overflow-y-auto bg-[#FAFBFB]'>
  <div className='mb-9'>
      <p className='text-xl text-gray-600 text-center'>Allocation Of Rooms</p>
  <div>
  <form onSubmit={handleSubmit} className='mb-6 overflow-y-auto'  >
<div className="mt-5 md:mt-0 md:col-span-2">
    <div className="shadow-sm sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input  label="First Name"   className="mt-1 focus:ring-blue-500
             focus:border-blue-500 block    w-full
             shadow-sm sm:text-sm border-gray-500 rounded-md"
             type='text'
             value={FName}
             onChange={(e)=>setFName(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Last Name"  className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full
              shadow-sm sm:text-sm border-gray-300 rounded-md"
              type='text'
               value={LName} 
               onChange={(e)=>setLName(e.target.value)} 
               />
          </div>
          <div className="col-span-6 sm:col-span-4">
            <Input  label="Phone Number" type="text" 
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={PNumber} 
            onChange={(e)=>setPNumber(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Gender" type="text" 
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full
             shadow-sm sm:text-sm border-gray-300 rounded-md"
             value={Gender} 
             onChange={(e)=>setGender(e.target.value)}/>
          </div>
          
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <Input  label="Age" type="number"  className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm 
             sm:text-sm border-gray-300 rounded-md"
             value={Age} 
             onChange={(e)=>setAge(e.target.value)}
             />
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <Input  label="Room Number" type="text"  className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm 
             sm:text-sm border-gray-300 rounded-md"
             value={RoomNo} 
             onChange={(e)=>setRoomNo(e.target.value)}
             />
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <Input  label="Date Allocated" type="date"  className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm 
             sm:text-sm border-gray-300 rounded-md"
             value={EntryDate} 
             onChange={(e)=>setEntryDate(e.target.value)}
             />
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <Input  label="Expected Exit Date" type="date"  className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm 
             sm:text-sm border-gray-300 rounded-md"
             value={ExitDate} 
             onChange={(e)=>setExitDate(e.target.value)}
             />
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-2 invisible">
            <Input   label="User Id" type="hidden"  className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm 
             sm:text-sm border-gray-300 rounded-md"
             value={userId} 
             onChange={(e)=>setuserId(e.target.value)}
             />
          </div>
          
        </div>
      </div>
      <div className='p-3 mb-8 flex justify-end'><button  className='bg-gray-700  px-6 rounded-md border text-white py-1'type='submit' variant='standard'>Submit</button></div>
    </div>
</div>
</form>
  </div>
</div> 
</div>
    </div>
  )
}

export default BookingsAllocate