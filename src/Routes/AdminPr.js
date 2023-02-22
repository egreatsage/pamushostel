import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

const AdminPr = ({children}) => {
  let {user} = useUserAuth();
  if(!user){
       return <Navigate to="/adminlogin"/>
  }
  return  children;
}

export default AdminPr 