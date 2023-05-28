import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../Common/UserAuthContext';

const HostellarPr = ({children}) => {
  let {user} = useUserAuth();
  if(!user){
    return <Navigate to="/login"/>
     }   
    return  children;
}

export default HostellarPr 