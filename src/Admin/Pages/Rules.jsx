import React, { useState, useEffect, useRef } from 'react'
import { Input} from '@material-tailwind/react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { addDoc, collection, deleteDoc, getDocs, updateDoc ,doc} from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import Swal from 'sweetalert2';
const Rules = () => {
 const [loading, setloading] = useState(false);
 const [rules, setRules] = useState('');
 const [selectedRule, setSelectedRule] = useState(null);
 const [rulesData, setRulesData] = useState([]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedRule) {
        // Update existing room
        await updateDoc(doc(db, 'rules', selectedRule.docId), {
         rules
        });
        Swal.fire({
          icon:'success',
          title: 'Successful',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        // Add new room
        await addDoc(collection(db, 'rules'), {
         rules
        });
        Swal.fire({
          icon:'success',
          title: 'Successful',
          showConfirmButton: false,
          timer: 2000
        })
      }
      setSelectedRule(null);
      setRules('');
   
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, 'rules', docId));
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

  const handleEdit = (rule) => {
    setSelectedRule(rule);
    setRules(rules.rules)
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'rules'));
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setRulesData(data);
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
            Rules
            </h1>
       <div className='mt-9  pt-8 '> 
    

     <form onSubmit={handleSubmit} >
      <h1 className="text-md mx-2 font-semibold my-8">Add/Edit Rules</h1>
        <div className=' md:py-8 w-full md:border md:rounded-lg shadow-md md:p-3  gap-3 mx-2 md:my-6 my-4 overflow-x-hidden'>
        <div className='my-3'><Input
         value={rules}
         onChange={(e)=>setRules(e.target.value)}
        color='teal' type='text' className='text-black' variant='standard' label='Add  Rule' /></div>
        </div> 
        <div  className='flex justify-end mr-8'> <button type='submit' className='rounded-md bg-[#8DA2FB] text-white font-bold px-8 hover:shadow-2xl py-2'>Add </button></div>
      </form>
  <h1 className="text-md ml-2 my-4 font-semibold ">Rules</h1>
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
                Rule
              </th>
            
              
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Action
              </th>
            </tr>
          </thead>
        
          <tbody>
           {rulesData.map((rule,index)=>(
            <tr key={rule.docId} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {rule.rules}
              </td>
            
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button className='px-1 mx-1 text-green-700 font-bold' onClick={() => handleEdit(rule) }>Edit</button>
              </td>
              <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button className='px-1 mx-1 text-red-700 font-bold' onClick={() => handleDelete(rule.docId)}>Delete</button>
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
 
export default Rules