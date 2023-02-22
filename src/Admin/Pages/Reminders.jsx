import { Input, Textarea } from '@material-tailwind/react'

import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav';
import EmployeeDataService from '../../Operations';
import { toast } from 'react-toastify';

const Reminders = () => {
  const [reminder, setReminder] = useState();
  const [date, setDate] = useState();
  const [adinfo, setadinfo] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReminder= {
     reminder,date,adinfo
    };
    try {
        await EmployeeDataService.addReminder(newReminder);
        toast.success('Reminder Added')
        setTimeout(() => {
          navigate('/reminders');
      }, 3000);
      
    } catch (err) {
      toast.error('Error Adding')
    }
    setReminder(""); setDate('');setadinfo('');
  };

  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    getAllReminders();
  }, []);
  const getAllReminders = async () => {
    try {
      const data = await EmployeeDataService.getAllReminders();
      setReminders(data.docs.map((doc) => ({ ...doc.data(),
        id: doc.id })));
      
    } catch (error) {
      toast.error('Error getting details')
    }
  };
  const deleteHandler = async (id) => {
    await EmployeeDataService.deleteReminder(id);
    getAllReminders();
  };
  return (
    <div>
      <Nav/>
       <div className='mt-9 pt-9'>
      <div className='mt-9 md:mx-9 mx-2'>
      <h1 className=" text-md md:text-2xl my-6 text-center">
            Add Your To Do
        </h1>
         <form onSubmit={handleSubmit}>
           <Textarea label='Add Your To Do' color='teal' type='text'  className='mb-3' 
           onChange={(e)=>setReminder(e.target.value)}/>
           <Textarea label='Additional Information' color='teal' type='text'  className='mb-3' 
           onChange={(e)=>setReminder(e.target.value)}/>
           <Input label='Date' type='date' className='mb-3'
           onChange={(e)=>setDate(e.target.value)}/>
           <div className='my-4 justify-end flex'><button className='bg-gray-700  px-6 rounded-md border text-white py-1'type='submit' variant='standard'>Submit</button></div>
         </form>

      </div>
      <Divider/>
      <div className='mt-3'>
        <h1 className='text-center text-md md:text-2xl '>Your To Do List</h1>
        {reminders.map((doc,index)=>{
             return(
        <div className='border border-gray-400 mb-4   rounded-md shadow-md px-4 md:mx-9 mx-2'>
         
              <div>
              <div className='my-3'><span>Date:</span><p className='text-gray-700'>{doc.date}</p></div>
              <div className='my-2'><span>Additional Information:</span><p className='text-gray-500'>{doc.adinfo}</p></div>
              <div className='my-2'><span>To Do:</span><p className='text-gray-700'>{doc.reminder}</p></div>
              </div>
           
             

             <div className="justify-end flex gap-3 mb-3">
              <button  
              className='bg-gray-700  px-6 rounded-md border text-white py-1'>Mark As Done</button>
              <button 
              onClick={(e) => 
                deleteHandler(doc.id)} className='bg-gray-700  px-6 rounded-md border text-white py-1'>Delete</button>
             </div>
        </div>
          )
        })}
      </div>
    </div>
    </div>
   
  )
}

export default Reminders