import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../Common/dbconfig';

const Userview = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, 'RegisteredUsers', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p>Firstname: {user.firstname}</p>
      <p>Lastname: {user.lastname}</p>
      <p>Gender: {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
      <p>Phone Number: {user.phonenumber}</p>
      <p>Email: {user.email}</p>
      <p>School: {user.school}</p>
      <p>Staytime: {user.staytime}</p>
    </div>
  );
};

export default Userview;
