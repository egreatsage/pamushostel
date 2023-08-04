import { useToast } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc,addDoc, getDocs, orderBy, query, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';
import {AiFillDelete,AiFillEdit, AiFillEye} from  'react-icons/ai'
import Loader from '../../Loader';
import { useNavigate } from 'react-router-dom';
const RegisteredUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [gender, setGender] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [school, setSchool] = useState('')
  const [staytime, setStaytime] = useState('')
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true)
   const toast = useToast()

   const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const auth = getAuth();
      let userId = null;
  
      if (!editingUser) {
        // Create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        userId = userCredential.user.uid;
      }
  
      // Update existing user or newly created user
      const userRef = editingUser
        ? doc(db, 'RegisteredUsers', editingUser.id)
        : doc(collection(db, 'RegisteredUsers')); // <- Fixed here, creating a new doc reference
  
      await setDoc(userRef, { // <- Changed from updateDoc to setDoc
        firstname,
        lastname,
        gender,
        phonenumber,
        school,
        staytime,
        userId,
        email // Use the newly generated userId for new users and existing userId for updates
      });
  
      toast({
        position: 'top',
        description: editingUser ? 'User updated successfully' : 'Registered successfully',
        status: 'success',
      });
      setLoading(false)
  
      setEditingUser(null);
      setEmail(''); // Clear email and password fields
      setPassword('');
      setFirstname('');
      setLastname('');
      setGender('');
      setPhonenumber('');
      setSchool('');
      setStaytime('');
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast({
        description: `${error.message}`,
        status: 'error',
        duration: 9000,
        position: 'top',
      });
    }
  };
  
  
  
  
  const fetchUsers = async () => {
    const usersRef = collection(db, 'RegisteredUsers');
    const usersSnapshot = await getDocs(usersRef);
    const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(usersData);
    setLoading(false)
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditingUser(userToEdit);
 
      setFirstname(userToEdit.firstname);
      setLastname(userToEdit.lastname);
      setGender(userToEdit.gender);
      setPhonenumber(userToEdit.phonenumber);
      setSchool(userToEdit.school);
      setStaytime(userToEdit.staytime);
    }
  };
  
 
  const handleDelete = async (id) => {
    // Implement the delete functionality here
    try {
      await deleteDoc(doc(db, 'RegisteredUsers', id));
      toast({
        description: 'User deleted successfully',
        status: 'success',
        position:'top'
      });
      fetchUsers();
    } catch (error) {
     
      toast({
        description: `${error}`,
        status: 'error',
        duration: 9000,
        position: 'top',
      });
    }
  };
  const navigate = useNavigate();
  return (
   <div>
      <div>
       <h1 className='text-center flex text-xl ml-5 font-semibold my-7'>Registered Users</h1>
       
         <div className=''>
         <div className='flex items-center justify-center h-auto md:h-screen md:mt-0'>
            <form className='mb-5' onSubmit={handleSubmit} >
            <h1 className='text-center flex text-md font-semibold my-7'>Add/Update User</h1>
              <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4'>
              {!editingUser && (
              <div className='flex flex-col '>
            <label className='text-gray-700' >Email</label>
              <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
              placeholder='Enter email'
              type='email'
               onChange={e=> setEmail(e.target.value)}
              />
            </div>
              )}
              {!editingUser && (
            <div className='flex flex-col mx-2'>
            <label className='text-gray-700  text-sm' >Password</label>
              <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
              placeholder='Enter Password'
              type='password'
              
               onChange={e=> setPassword(e.target.value)}
              />
            </div>
              )}
            <div className='flex flex-col mx-2 '>
            <label className='text-gray-700  text-sm' >First Name</label>
              <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
              placeholder='Enter firstname'
              type='text'
              value={firstname}
               onChange={e=> setFirstname(e.target.value)}
              />
            </div>
            <div className='flex flex-col mx-2 '>
            <label className='text-gray-700  text-sm' >Last Name</label>
              <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
              placeholder='Enter lastname'
              type='text'
              value={lastname}
               onChange={e=> setLastname(e.target.value)}
              />
            </div>
            <div className='flex flex-col mx-2 '>
            <label className='text-gray-700  text-sm' >Gender</label>
            <select
          className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
                 value={gender}
                 onChange={e=> setGender(e.target.value)}
                 >
         <option className='pt-9'  value="">Select Gender</option>
         <option  value='male'>Male</option>
         <option  value='Female'>Female</option>
    
      </select>
            </div>
            <div className='flex flex-col mx-2 '>
            <label className='text-gray-700  text-sm' >Phone Number</label>
              <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
              placeholder='Enter Phonenumber'
              type='tel'
              value={phonenumber}
               onChange={e=> setPhonenumber(e.target.value)}
              />
            </div>
            <div className='flex flex-col mx-2 '>
            <label className='text-gray-700  text-sm' >School</label>
              <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
              placeholder='Enter school'
              type='text'
               value={school}
               onChange={e=> setSchool(e.target.value)}
              />
            </div>
            <div className='flex flex-col mx-2 '>
            <label className='text-gray-700  text-sm' >Expected staytime</label>
              <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
              placeholder='e.g 5 months'
              type='text'
               value={staytime}
               onChange={e=> setStaytime(e.target.value)}
              />
            </div>
              </div>
              <div className='flex justify-end mt-6'>
              <button type="submit" className="bg-blue-gray-900 text-white rounded-[10px] py-[6px] hover:shadow-2xl px-6">
      {editingUser ? 'Update' : 'Submit'}
    </button>
              </div>
            </form>
          </div>
         </div>
      
    </div>
     <div>

</div>
<div class="flex flex-col overflow-x-auto">
  <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto">
        {loading?(<Loader/>):(
          <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">#</th>
              <th scope="col" class="px-6 py-4">Firstname</th>
              <th scope="col" class="px-6 py-4">Lastname</th>
              <th scope="col" class="px-6 py-4">Gender</th>
              <th scope="col" class="px-6 py-4">Phonenumber</th>
              <th scope="col" class="px-6 py-4">Email</th>
              <th scope="col" class="px-6 py-4">School</th>
              <th scope="col" class="px-6 py-4">Staytime</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} class="border-b dark:border-neutral-500">
                <td  class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                <td class="whitespace-nowrap px-6 py-4">{user.firstname}</td> 
                <td class="whitespace-nowrap px-6 py-4">{user.lastname}</td>
                <td class="whitespace-nowrap px-6 py-4">{user.gender}</td>
                <td class="whitespace-nowrap px-6 py-4">{user.phonenumber}</td>
                <td class="whitespace-nowrap px-6 py-4">{user.email}</td>
                <td class="whitespace-nowrap px-6 py-4">{user.school}</td>
                <td class="whitespace-nowrap px-6 py-4">{user.staytime}</td>
                <td class="whitespace-nowrap flex px-6 gap-3  py-4">
                  <AiFillEdit className='text-2xl cursor-pointer text-orange-800' onClick={() => handleEdit(user.id)}/>
                  <AiFillDelete className='text-2xl cursor-pointer text-red-600' onClick={() => handleDelete(user.id)}/>
                  <AiFillEye className='text-2xl cursor-pointer text-green-600' onClick={() => navigate(`/userview/${user.id}`)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      
      </div>
    </div>
  </div>
</div>
<div>

</div>
   </div>
  )
}

export default RegisteredUsers