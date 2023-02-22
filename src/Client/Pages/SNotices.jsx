import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import dbdataservice from "../../Operations"
const SNotices = () => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    getAllNotices();
  }, []);
  const getAllNotices = async () => {
    const data = await dbdataservice.getAllNotices();
    setNotices(data.docs.map((doc) => ({ ...doc.data(),
      id: doc.id })));
  };
  return (
    <div>
        <Link className='pl-3 mb-4 mt-4' to='/userprofile'>
        <Button  className=' bg-gray-700 hover:bg-black font-extrabold text-white  py-2 rounded-md'>Back</Button>
        </Link>
      <div className='md:mx-9 md:px-9 md:my-6 mt-5'>
        
      <h1 className='text-center mb-4 font-extrabold pt-3 underline'>Hostel Notices</h1>
       {notices.map((doc)=>{
             return(
        <div className='border mt-3 md:px-8 w-full mb-4 rounded-md border-black'>
                <div className='tracking-widestmt-3 font-bold '>
                  <p>{doc.name}</p>
                   <p>{doc.designation}</p>
                   <p>{doc.TheDate}</p>
                   <p className=' font-bold underline my-3'><span className='underline mr-3'>REF: </span>{doc.Reff}</p>
        </div>

          <div className=' mb-4 text-gray-800'>
                       
                        <p className=''>
                     {doc.Notice}
                     </p>
          </div>
        </div>
           )
          })}
    </div>
    </div>
    
  )
}

export default SNotices