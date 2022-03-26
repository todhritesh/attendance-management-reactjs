import { Box, Card, Container, CardActionArea, CardContent, Divider, Grid, Typography, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Button, Paper } from '@mui/material'
import { onValue, ref , set , push } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase-config'
import { userContext } from '../../../helper/context'
import { generateDate } from '../../../helper/generateDate'
import AddNewStudent , {handlePresentAbsent} from './attendanceLogic'


function Attendance() {
    const [attendanceData , setAttendanceData] = useState([])
    const {user} = useContext(userContext)
    const [open , setOpen] = useState(false)
    const [studentData , setStudentData] = useState([])
    const navigate = useNavigate()
    function handleClick() {
        navigate('/admin/manage-teachers')
    }

    const getData = () => {
        const studentsRef = ref(db , `am_students/${user.uid}`);
        onValue(studentsRef , snap => {
            let data = []
            snap.forEach(item => {
                const id = item.key;
                const value = item.val();
                data = [...data, {...value,id:id}]
            })
            setStudentData(data);
        })
    }

    const checkAttendanceDate = () => {
        const attendacneRef = ref(db , `attendance/${user.uid}/${generateDate()}`);
        onValue(attendacneRef , snap => {
            if(snap.size===0){
                const newAttendance = ref(db , `attendance/${user.uid}/${generateDate()}`);
                studentData.forEach(item => {
                    item['attendance'] = ''
                    const attendacneKey = push(newAttendance)
                    set(attendacneKey , item)
                })
            }
        })

        onValue(attendacneRef , snap => {
            let data = []
            snap.forEach(item => {
                const id = item.key;
                const value = item.val();
                data = [...data, {...value,key:id}]
            })
            setAttendanceData(data);
        })
    }
    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        checkAttendanceDate()
    },[studentData])
    console.log(attendanceData.length)
    return (
        <Box component={Container} sx={{ minWidth: '100vw', mt: 15 }}>
            <Typography variant='h3' >
                Teacher's Dashboard
            </Typography>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Grid item container lg={11} md={8} sx={{ mx: 'auto', mt: 5 }} spacing={2}>
                <Paper sx={{overFlow:'auto',whiteSpace:'nowrap'}}>
                <TableContainer sx={{ width: '100vw', overFlow: 'auto' }} >
                    <Button onClick={()=>setOpen(true)} variant="contained" color="success" sx={{m:1}} >Add New Student</Button>
                    <Typography sx={{m:1}} variant="h5">Attendance :{generateDate()}</Typography>
                    {
                        studentData.length===0 ?
                        <Typography align='center' variant="h4" color="error">Add student </Typography>
                    :
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Sl no</TableCell>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Name</TableCell>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Subject</TableCell>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Attendance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                attendanceData.lenght!==0 &&
                                attendanceData.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="center" >{i + 1}</TableCell>
                                        <TableCell align="center" >{item.name}</TableCell>
                                        <TableCell align="center" >{item.subject}</TableCell>
                                        <TableCell align="center" >
                                        {
                                            item.attendance === '' ? 
                                            <>
                                            <Button onClick={()=>handlePresentAbsent(item.key , user , 'p')} size="small" variant='contained' color="success">P</Button>
                                            <Button onClick={()=>handlePresentAbsent(item.key , user , 'a')} size="small" variant='contained' color="error">A</Button>
                                            </>
                                            : item.attendance ==='p' ? <Typography component={'span'} sx={{px:2,py:1,background:"#21aa25",color:'white'}}>Present</Typography>:
                                            <Typography component={'span'} sx={{px:2,py:1,background:"#e83333",color:'white'}}>Absent</Typography>
                                        }
                                        
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    }
                </TableContainer>
                </Paper>
            </Grid>
            <AddNewStudent open={open} setOpen={setOpen} attendanceData={attendanceData} setAttendanceData={setAttendanceData}/>
        </Box>
    )
}

export default Attendance