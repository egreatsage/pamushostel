import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../Common/UserAuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';

const UserInfo = () => {
  const { user } = useUserAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  const fetchUserInfo = async () => {
    try {
      const q = query(collection(db, 'RegisteredUsers'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 1) {
        // Assuming there's only one document matching the UID
        const doc = querySnapshot.docs[0];
        setUserInfo(doc.data());
      } else {
        // Handle error or show appropriate message if the user data is not found
        setUserInfo(null);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Handle error or show appropriate message
      setUserInfo(null);
    }
  };

  return (
    <div>
       <div>
        <h1 className='text-xl ml-2 font-semibold text-gray-700 rounded-sm '>Personal Information</h1>
        {userInfo ? (
        <div className='bg-gray-50 py-9 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          <div className='flex gap-2 ml-3'>
            <h1>First Name:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{userInfo.firstname}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>Last Name:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{userInfo.lastname}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>Gender:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{userInfo.gender}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>Phone Number:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{userInfo.phonenumber}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
          <div className='flex gap-2 ml-3'>
            <h1>School:</h1>
            <h1 className='ml-1 text-gray-800 font-semibold'>{userInfo.school}</h1>
          </div>
          <div className="divider mx-3 rounded-lg mb-3 my-3 md:hidden lg:hidden xl:hidden sm:hidden"></div>
        </div>
         ) : (
          <p>Loading user info...</p>
          )}

       </div>

    </div>
  );
};

export default UserInfo;
