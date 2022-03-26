import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import {Login,Home , AdminDashboard ,ManageTeachers, TeacherDashboard, ManageStudents, Attendance, ViewAttendance, ViewAttendanceTable} from './pages/index'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import {userContext} from './helper/context'
import ProtectedRoutes from './helper/ProtectedRoutes'
import {auth, db} from './firebase-config'
import {onAuthStateChanged} from 'firebase/auth'
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database'


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    const change = onAuthStateChanged(auth , currentUser => {
      if(currentUser){
        if(user){
          const role = user.role;
          if(role === 'admin'){
            navigate("/admin")
          }
          if(role === 'teacher'){
            navigate("/teacher")
          }
        }else{
          const userRef = ref(db , 'am_users');
          const q = query(userRef , orderByChild('username') , equalTo(currentUser.email))
          onValue(q , snap => {
            let role ;
            let subject ;
            snap.forEach(item => {
              role = item.val().role;
              subject = item.val()?.subject;
              console.log(role)
            })
            currentUser['role'] = role
            if(role==='admin'){
              setUser(currentUser)
              navigate("/admin")
            }
            if(role==='teacher'){
              currentUser['subject'] = subject
              setUser(currentUser)
              navigate("/teacher")
            }
          })
        }
      }else{
        navigate('/login')
        console.log("change")
      }
    })
    return () => {
      change()
    }
  },[])
  const [user,setUser] = useState('')
  return (
    <userContext.Provider value={{user,setUser}} >
    <Grid container sx={{background:'#dcdde1',minWidth:'100vw',minHeight:'100vh'}}>
      {
        location.pathname !== '/' && <Navbar/>
      }
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={ <Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route  path="/admin" element={<AdminDashboard/>} />
          <Route  path="/admin/manage-teachers" element={<ManageTeachers/>} />
          <Route  path="/teacher" element={<TeacherDashboard/>} />
          <Route  path="/teacher/manage-students" element={<ManageStudents/>} />
          <Route  path="/teacher/start-attendance" element={<Attendance/>} />
          <Route  path="/teacher/view-attendance" element={<ViewAttendance/>} />
          <Route  path="/teacher/view-attendance/date" element={<ViewAttendanceTable/>} />
        </Route>
      </Routes>
      <ToastContainer/>
    </Grid>
    </userContext.Provider>
  )
}

export default App

