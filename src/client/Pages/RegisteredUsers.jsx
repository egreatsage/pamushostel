import React, { useEffect, useState } from 'react';
import {Button,useToast } from '@chakra-ui/react'
import {ConfigProvider, Table} from 'antd'
import { collection, deleteDoc, doc,addDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from '../../Common/dbconfig';


const RegisteredUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [gender, setGender] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [school, setSchool] = useState('')
  const [staytime, setStaytime] = useState('')
  const [selectedUser, setSelectedUser] = useState(null);

  const toast = useToast();
  const fetchRegisteredUsers = async () => {
    try {
      const q = query(collection(db, 'RegisteredUsers'), orderBy('createdAt'));
      const querySnapshot = await getDocs(q);

      const users = [];
      console.log(users)
      querySnapshot.forEach((doc) => {
        users.push({
          ...doc.data(),
          _id: doc.id,
        });
      });

      setRegisteredUsers(users);
    } catch (error) {
      console.error('Error fetching registered users:', error);
      toast({
        description: 'Error fetching registered users',
        status: 'error',
        duration: 5000,
        position: 'top',
      });
    }
  };
  useEffect(() => {
    fetchRegisteredUsers();
  }, []);
    const handleDeleteUser = async (userId) => {
      try {
         await deleteDoc(doc(db, "RegisteredUsers", userId));
        setRegisteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast({
          description: 'User deleted successfully',
          status: 'success',
          duration: 5000,
          position: 'top',
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        toast({
          description: 'Error deleting user',
          status: 'error',
          duration: 5000,
          position: 'top',
        });
      }
    }
    const columns =[
      {
        title:'First name',
        dataIndex:'firstname',
        sorter:(a,b) =>a?.firstname.localeCompare(b?.firstname),
      },
      {
        title:'Last name',
        dataIndex:'lastname',
        sorter:(a,b) =>a?.lastname.localeCompare(b?.lastname),
      },
      {
        title:'Email',
        dataIndex:'email',
        sorter:(a,b) =>a?.email.localeCompare(b?.email),
      },
      {
        title:'Contact',
        dataIndex:'phonenumber',
        sorter:(a,b) =>a?.phonenumber.localeCompare(b?.phonenumber),
      },
      {
        title:'Gender',
        dataIndex:'gender',
        sorter:(a,b) =>a?.gender.localeCompare(b?.gender),
      },
      {
        title:'School',
        dataIndex:'school',
        sorter:(a,b) =>a?.school.localeCompare(b?.school),
      },
      {
        title:'Action',
        dataIndex:'action',
        render:(_, n) =>{
          return(
           <div className='flex mx-2 '>
             <div className='mx-2'>
              <Button  colorScheme='green' onClick={() => handleEditUser(n)} >
            Edit
              </Button>
            </div>
            <div>
              <Button  colorScheme='red' onClick={()=>handleDeleteUser(n?._id)}>Delete</Button>
            </div> 
           </div>
          )
        }
      }
    ]
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (selectedUser) {
          const userUpdateData = {
            firstname,
            lastname,
            phonenumber,
            gender,
            school,
            staytime,
          };
          await updateDoc(doc(db, 'Bookings', selectedUser.user), {userUpdateData});
         
        } else {
          // Create user with email and password only when adding a new user
          const auth = getAuth();
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const userId = userCredential.user.uid;
    
          const userData = {
            email,
            firstname,
            lastname,
            gender,
            school,
            staytime,
            phonenumber,
            createdAt: new Date().toISOString(),
            userId,
          };
          await addDoc(collection(db, 'RegisteredUsers'), userData);
          toast({
            description: 'User created successfully',
            status: 'success',
            duration: 5000,
            position: 'top',
          });
    
          setEmail('');
          setPassword('');
          setFirstname('');
          setLastname('');
          setGender('');
          setPhonenumber('');
          setSchool('');
          setStaytime('');
    
          // Refresh the list of registered users
          fetchRegisteredUsers();
        }
      } catch (error) {
        console.error('Error creating/updating user:', error);
        toast({
          description: 'Error creating/updating user',
          status: 'error',
          duration: 5000,
          position: 'top',
        });
      }
    };
    
    const handleEditUser = (user) => {
      setEmail(user.email)
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setGender(user.gender);
      setPhonenumber(user.phonenumber);
      setSchool(user.school);
      setStaytime(user.staytime);
      setSelectedUser(user);
    };
    
  return (
    <div>
       <h1 className='text-center flex text-xl ml-5 font-semibold my-7'>Registered Users</h1>
     <div className=''>
     <div className='flex items-center justify-center h-auto md:h-screen md:mt-0'>
        <form className='mb-5' onSubmit={handleSubmit} >
        <h1 className='text-center flex text-md font-semibold my-7'>Add/Update User</h1>
          <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4'>
          <div className='flex flex-col '>
        <label className='text-gray-700' >Email</label>
          <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
          placeholder='Enter email'
          type='email'
           onChange={e=> setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col mx-2'>
        <label className='text-gray-700  text-sm' >Password</label>
          <input className='w-auto  rounded-[10px] py-1 px-3 outline-none border border-gray-400'
          placeholder='Enter Password'
          type='password'
          
           onChange={e=> setPassword(e.target.value)}
          />
        </div>
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
           <button type='submit' className='bg-blue-gray-900 text-white rounded-[10px]  py-[6px] hover:shadow-2xl px-6'>Submit</button></div>
        </form>
      </div>
     </div>

      <div className='overflow-x-auto'>
        <ConfigProvider
        theme={{
          token:{
            colorPrimary:'#000',
            colorPrimaryTextActive:"#000",
            colorPrimaryText:'#808080',
            colorPrimaryBg:'#fff'
          },
        }}  
        >
         <div>
          <Table dataSource={registeredUsers} columns={columns}
          loading={registeredUsers.length === 0}
          rowKey = {(data)=>data._id}
          pagination={{
          defaultPageSize:5,
          showSizeChanger:true,
          pageSizeOptions:["8",'10','11'],
        }} />
         </div>
        </ConfigProvider>
      </div>

    </div>
  );
};

export default RegisteredUsers;
