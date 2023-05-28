import React, { useEffect, useState } from 'react'
import dbdataservice from "../../Common/Operations"
import Navbar from '../Components/Navbar';
import Loader from '../Components/Loader';
import Swal from 'sweetalert2';

const SNotices = () => {
  const [notices, setNotices] = useState([]);
    const [loading, setloading] = useState(true)
  useEffect(() => {
    getAllNotices();
  }, []);
  const getAllNotices = async () => {

    try {
        const data = await dbdataservice.getAllNotices();
    setNotices(data.docs.map((doc) => ({ ...doc.data(),
      id: doc.id })));
      setloading(false)
    } catch (error) {
         Swal.fire({
        text: 'Problem fetching details,please try again',
        icon: 'error',
        timer:3000,
        width:400,
        position:'top-right',
        confirmButtonText: 'Close'
      })
    }
  
  };
  return (
    <div className='mt-20'>
      <div>
        <Navbar/>
      </div>
      <div className='md:mx-9 md:px-9 md:my-6 mt-20'>
      <h1 className='text-center mb-4 font-extrabold pt-3 underline'>Hostel Notices</h1>
      {loading ?(
         <Loader/>
        ):
        <div>
 {notices.map((doc)=>{
             return(
        <div className=' mt-3 md:px-8 w-full mb-4 rounded-md '>
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
      
        }
    </div>
    </div>
    
  )
}

export default SNotices