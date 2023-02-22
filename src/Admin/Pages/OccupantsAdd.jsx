import React, { useEffect, useState } from 'react'
import {Input} from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom';
import dbdataservice from '../../Operations';
import Nav from '../Components/Nav';
import { toast } from 'react-toastify';
const OccupantsAdd = ({ id, setOccupantId }) => {
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [PNumber, setPNumber] = useState('');
  const [Gender, setGender] = useState('');
  const [RoomNo, setRoomNo] = useState('');
  const [EntryDate, setEntryDate] = useState('');
  const [ExitDate, setExitDate] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (FName === "" || LName ===  "" ||RoomNo ==="") {
      toast.error('Missing fields')
      return;
    }
    const newOccupant= {
     FName,LName,Gender,PNumber,EntryDate,RoomNo,ExitDate     
    };
    try {
      if (id !== undefined && id !== "") {
        await dbdataservice.updateOccupant(id, newOccupant);
        setOccupantId("");
        toast.success('Updated successfully')
       
          navigate('/occupants');
    
      } else {
        await dbdataservice.addOccupant(newOccupant);
        toast.success('New Occupant added successfully')
      }
    } catch (err) {
      toast.success('problem adding occupant')
    }
    setFName(""); setLName("");setGender("");setEntryDate("");setPNumber("");
    setRoomNo("");setExitDate("");
  };
  const editHandler = async () => {
    toast.success('Successfully Edited')
    try {
      const docSnap = await dbdataservice.getOccupant(id);
      setFName(docSnap.data().FName);
      setLName(docSnap.data().LName);
      setGender(docSnap.data().Gender);
      setPNumber(docSnap.data().PNumber);
      setEntryDate(docSnap.data().EntryDate);
      setRoomNo(docSnap.data().RoomNo);
      setExitDate(docSnap.data().ExitDate);
    } catch (err) {
      toast.success('Error Editing')
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    } //eslint-disable-next-line
  }, [id]);
  return (
    <div>  
       <div><Nav/></div>
  <div className='md:p-9'>
    <p className='text-xl text-gray-600 text-center'>Add or Edit Occupants</p>
    <div className="md:m-9">
<form onSubmit={handleSubmit} >
<div className="mt-5 md:mt-0 md:col-span-2">
    <div className="shadow  sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input  label="First Name"   className="mt-1 focus:ring-blue-500 focus:border-blue-500 block 
            w-full
             shadow-sm sm:text-sm border-gray-500 rounded-md"
             type='text'
             value={FName}
             onChange={(e)=>setFName(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Last Name"   className="mt-1
             focus:ring-blue-500 focus:border-blue-500 block w-full
              shadow-sm sm:text-sm border-gray-300 rounded-md"
              type='text'
               value={LName} 
               onChange={(e)=>setLName(e.target.value)} 
               />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Phone Number" type="text"  autocomplete="email" 
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={PNumber} 
            onChange={(e)=>setPNumber(e.target.value)}
            />
          </div> 
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Gender" type="text"  
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full     shadow-sm sm:text-sm border-gray-300 rounded-md"
         
             value={Gender} 
             onChange={(e)=>setGender(e.target.value)}/>
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <Input  label="Room Number" type="text"   className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
             value={RoomNo} 
             onChange={(e)=>setRoomNo(e.target.value)}
             />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input  label="Entry Date" type="date" 
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer" 
            
            value={EntryDate} 
            onChange={(e)=>setEntryDate(e.target.value)}
              />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input  label="Exit Date" 
            autocomplete="postal-code" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer"
             
              
              type='date'
              value={ExitDate} 
              onChange={(e)=>setExitDate(e.target.value)}
              />
          </div>
        </div>
      </div>
    </div>
</div>
<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
<button  className='bg-gray-700  px-6 rounded-md border text-white py-1'type='submit' variant='standard'>Submit</button>
      </div>
</form>
    </div>
    
       </div>
    
    </div>
  )
}

export default OccupantsAdd