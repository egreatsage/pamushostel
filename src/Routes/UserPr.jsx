import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

const UserPr = ({children}) => {
  let {user} = useUserAuth();
  if(!user){
       return <Navigate to="/usersignup"/>
  }
  return  children;
}
export default UserPr 