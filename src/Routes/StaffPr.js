import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

const StaffPr = ({children}) => {
  let {user} = useUserAuth();
  if(!user){
       return <Navigate to="/stafflogin"/>
  }
  return  children;
}
export default StaffPr 