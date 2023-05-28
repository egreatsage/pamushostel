
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import dbdataservice from '../../Common/Operations';
import Navbar from '../Components/Navbar';
import Loader from '../Components/Loader';
import Swal from 'sweetalert2';

const Notices = () => {
  const [rules, setRules] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
    getAllRules();
  }, []);
  const getAllRules = async () => {
    try {
      const data = await dbdataservice.getAllRules();
      setRules(data.docs.map((doc) => ({ ...doc.data(),
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
  }
  const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
  return (
    <div>
      <Navbar/>
      <div className='md:mx-9 md:px-9 md:my-6 mt-20 pt-20   '>
      <h1 className='text-center mb-4 font-extrabold pt-3 underline'>Hostel Rules</h1>
      <button className='underline tracking-wider ml-5 hover:text-[blue]' onClick={handlePrint}>Print Document</button>
      <div ref={componentRef} className='mt-4'>
        {loading ?(
         <Loader/>
        ):
        <div className=' md:my-5 mx-1 rounded-sm'>
        <p className='tracking-wider text-black text-center mx-3 italic  font-extrabold my-5'>The Following Rules and Regulations should be applied and followed by all Hostel 
          Fraternity as a guide to ethics and proper conduct of the Hostel Family
        </p>
      {rules.map((doc,index)=>{
             return(
        <div className=' md:px-8 w-full mb-4 rounded-md md:my-6'>
                    <p className=' my-3 mx-2'>
                     <span className='font-bold mr-3 ml-1'> {index + 1}:</span> {doc.rules}
                     </p>   
        </div>
           )
          })}
      </div>
        }
     
      </div>
     
    </div>
    </div>
    
  )
}

export default Notices