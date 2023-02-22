import React, { useState,useEffect } from 'react'
import { Input } from "@material-tailwind/react";
import dbdataservice from '../../Operations';
import {  useNavigate } from 'react-router-dom'
import Nav from '../Components/Nav';
import { toast } from 'react-toastify';
const BookingsAdd = ({ id, setBookingId }) => {
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [PNumber, setPNumber] = useState('');
  const [Gender, setGender] = useState('');
  const [Category, setCategory] = useState('');
  const [Age, setAge] = useState('');
  const [PGContact, setPGContact] = useState('');
  const [PGName, setPGName] = useState('');
  const [EName, setEName] = useState('');
  const [Homecounty, setHomecounty] = useState('');
  const [EContact, setEContact] = useState('');
  const [Relation, setRelation] = useState('');
  const [Institution, setInstitution] = useState('');
  const [YearOfStudy, setYearOfStudy] = useState('');
  const [MaritalStatus, setMaritalStatus] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (FName === "" || LName === "") {
    toast.error('Fill in All Fields')
      return;
    }
    const newBooking = {
     FName,LName,Gender,PNumber,PGContact,Age,PGName,
     EName,EContact,Relation,Institution,YearOfStudy,
     MaritalStatus,Homecounty,Category
    };
    try {
      if (id !== undefined && id !== "") {
        await dbdataservice.updateBooking(id, newBooking);
        setBookingId("");
       toast.success('Updated Successfully')
      } else {
        await dbdataservice.addBooking(newBooking);
       toast.success('Details Addedd Successfully')
        setTimeout(() => {
          navigate('/Bookings');
      }, 3000);
      }
    } catch (err) {
      toast.error('There Was A Problem adding new Details')
    }
    setFName(""); setLName("");setGender("");setPGContact("");setPNumber("");
    setAge("");setPGName(""); setEName(''); setEContact(''); setRelation(''); 
    setInstitution(''); setMaritalStatus('');
    setYearOfStudy('');   setHomecounty(''); setCategory('');
    
  };

  const editHandler = async () => {
   toast.success('Successfully Updated')
    try {
      const docSnap = await dbdataservice.getBooking(id);
      setFName(docSnap.data().FName);
      setLName(docSnap.data().LName);
      setGender(docSnap.data().Gender);
      setPNumber(docSnap.data().PNumber);
      setPGContact(docSnap.data().PGContact);
      setAge(docSnap.data().Age);
      setPGName(docSnap.data().PGName);
      setEName(docSnap.data().EName);
      setEContact(docSnap.data().EContact);
      setRelation(docSnap.data().Relation);
      setInstitution(docSnap.data().Institution);
      setYearOfStudy(docSnap.data().YearOfStudy);
      setMaritalStatus(docSnap.data().MaritalStatus);
      setHomecounty(docSnap.data().Homecounty);
      setCategory(docSnap.data().Category);

    } catch (err) {
      toast.success('There was a problem updating')
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

  <div className='mb-3'>
       <p className='font-bold mb-3 text-xl  pb-2  text-center'> Add or Edit Details</p>
  <form className='mb-6 overflow-y-auto' onSubmit={handleSubmit} >
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
            <Input  label="Home County" type="text" 
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={Homecounty} 
            onChange={(e)=>setHomecounty(e.target.value)}/>
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
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input  label="Marital Status" type="text"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={MaritalStatus} 
            onChange={(e)=>setMaritalStatus(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input  label="Hostel Category"  type='text'
            className="mt-1 focus:ring-blue-500
             focus:border-blue-500 block w-full shadow-sm sm:text-sm
              border-gray-300 rounded-md"
              value={Category} 
              onChange={(e)=>setCategory(e.target.value)} 
              />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input  label="Guardian/Parent Name"  type='text'
            className="mt-1 focus:ring-blue-500
             focus:border-blue-500 block w-full shadow-sm sm:text-sm
              border-gray-300 rounded-md"
              value={PGName} 
              onChange={(e)=>setPGName(e.target.value)} 
              />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Guardian/Parent Contact" type="text" 
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={PGContact} 
            onChange={(e)=>setPGContact(e.target.value)} />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Emergency Contact Name" type="text"  
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full
             shadow-sm sm:text-sm border-gray-300 rounded-md"
             value={EName} 
             onChange={(e)=>setEName(e.target.value)}  />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Emergency Contact" type="text"  
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={EContact} 
            onChange={(e)=>setEContact(e.target.value)} />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Relation" type="text"  
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full
             shadow-sm sm:text-sm border-gray-300 rounded-md"
             value={Relation} 
             onChange={(e)=>setRelation(e.target.value)}  />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Current Institution Of Study" type="text"  
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
            shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={Institution} 
            onChange={(e)=>setInstitution(e.target.value)} />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input  label="Year Of Study" type="text"  
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full
             shadow-sm sm:text-sm border-gray-300 rounded-md"
             value={YearOfStudy} 
             onChange={(e)=>setYearOfStudy(e.target.value)}  />
                
          </div>
          
      </div>
    </div>
</div>
<div className='p-3 mb-8 flex justify-end'>
<button  className='bg-gray-700  px-6 rounded-md border text-white py-1'type='submit' variant='standard'>Submit</button>
            </div>
        </div>
</form>
  </div>
</div> 
</div>
    </div>

  )
}

export default BookingsAdd