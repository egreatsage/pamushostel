import React, { useState, useEffect, useRef } from 'react'
import { Input, Textarea} from '@material-tailwind/react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { addDoc, collection, deleteDoc, getDocs, updateDoc ,doc} from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import Swal from 'sweetalert2';
const Notices = () => {
 const [loading, setloading] = useState(false);
 const [name, setName] = useState('');
 const [designation, setDesignation] = useState('');
 const [TheDate, setTheDate] = useState('');
 const [Reff, setReff] = useState('');
 const [Notice, setNotice] = useState('');
 const [selectedNotice, setSelectedNotice] = useState(null);
 const [noticesData, setNoticesData] = useState([]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedNotice) {
        // Update existing room
        await updateDoc(doc(db, 'Notices', selectedNotice.docId), {
         name,designation,TheDate,Reff,Notice
        });
        Swal.fire({
          icon:'success',
          title: 'Successful',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        // Add new room
        await addDoc(collection(db, 'Notices'), {
          name,designation,TheDate,Reff,Notice
        });
        Swal.fire({
          icon:'success',
          title: 'Successful',
          showConfirmButton: false,
          timer: 2000
        })
      }
      setSelectedNotice(null);
      setName('');
      setDesignation('');
      setTheDate('');
      setReff('');
      setNotice('');

   
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, 'Notices', docId));
      Swal.fire({
        icon:'success',
        title: 'Successful',
        showConfirmButton: false,
        timer: 2000
      })
      
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = (notice) => {
    setSelectedNotice(notice);
    setNotice(notice.Notice);
    setName(notice.name);
    setDesignation(notice.designation)
    setReff(notice.Reff)
    setTheDate(notice.TheDate)
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Notices'));
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setNoticesData(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  return (
  <div>
    <div>
            <div>
                  <main>
          <div>
            <h1 className="text-xl tracking-wider font-bold my-8 text-center">
            Notices 
            </h1>
       <div className='mt-9  pt-8 '> 
    

     <form onSubmit={handleSubmit} >
      <h1 className="text-md mx-2 font-semibold my-8">Add/Edit Notices</h1>
        <div className=' md:py-8 w-full md:border md:rounded-lg shadow-md md:p-3  gap-3 mx-2 md:my-6 my-4 overflow-x-hidden'>
        <div className='my-3'><Input
         value={name}
         onChange={(e)=>setName(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Name' /></div>
         <div className='my-3'><Input
         value={designation}
         onChange={(e)=>setDesignation(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Designation e.g Landlord, Caretaker' /></div>
            <div className='my-3'><Input
         value={TheDate}
         onChange={(e)=>setTheDate(e.target.value)}
        color='teal' type='date' className='text-black' variant='standard' label=' Date' /></div>
            <div className='my-3'><Textarea
         value={Reff}
         onChange={(e)=>setReff(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Write the Notice' /></div>
        </div> 
    
     
        <div  className='flex justify-end mr-8'> <button type='submit' className='rounded-md bg-[#8DA2FB] text-white font-bold px-8 hover:shadow-2xl py-2'>Add </button></div>
      </form>
  <h1 className="text-md ml-2 my-4 font-semibold ">Notices</h1>
    </div>
    <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table  class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Notices
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Action
              </th>
            </tr>
          </thead>
        
          <tbody>
           {noticesData.map((notice,index)=>(
            <tr key={notice.docId} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {notice.Notice}
              </td>
            
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button className='px-1 mx-1 text-green-700 font-bold' onClick={() => handleEdit(notice) }>Edit</button>
              </td>
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button className='px-1 mx-1 text-red-700 font-bold' onClick={() => handleDelete(notice.docId)}>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
                  </main>
      </div> 
        <label htmlFor="sidebar-toggle" className='body-label'/>
    </div>
  </div>
  )
}
 
export default Notices