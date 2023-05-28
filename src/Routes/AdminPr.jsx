import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../Common/UserAuthContext';

const AdminPr = ({children}) => {
  let {user} = useUserAuth();
  if(!user){
       return <Navigate to="/signin"/>
  }
  return  children;
}
export default AdminPr 