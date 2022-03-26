import React, { useContext } from 'react'
import {Navigate , Outlet} from 'react-router-dom'
import { userContext } from './context';

function ProtectedRoutes() {
  const {user , setUser} = useContext(userContext);
  return  user ? <Outlet /> : <Navigate to="/login" state={{unauthorized:true}} />
  
}

export default ProtectedRoutes