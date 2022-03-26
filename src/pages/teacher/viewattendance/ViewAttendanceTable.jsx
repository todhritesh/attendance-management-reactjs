import { Box, Container,  Divider, Grid, Typography, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Button, Paper } from '@mui/material'
import { onValue, ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../../../firebase-config'
import { userContext } from '../../../helper/context'


function ViewAttendanceTable() {
    const {user} = useContext(userContext)
    const [studentData , setStudentData] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const getData = () => {
        const key = location.state.key
        console.log(key)
        const studentsRef = ref(db , `attendance/${user.uid}/${key}`);
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
    useEffect(()=>{
        getData()
    },[])

    return (
        <Box component={Container} sx={{ minWidth: '100vw', mt: 15 }}>
            <Typography variant='h3' >
                Teacher's Dashboard
            </Typography>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Grid item container lg={11} md={8} sx={{ mt: 5 }} spacing={2}>
                <Paper sx={{overFlow:'auto',whiteSpace:'nowrap'}}>
                <TableContainer sx={{overFlow:'auto',minWidth:'100vw'}}>
                    <Box sx={{textAlign:'end',p:2,boxSizing:'border-box'}}>
                        <Button variant="contained" color="success" onClick={()=>navigate('/teacher/view-attendance')} >Back</Button>
                    </Box>
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
                                studentData.length !==0 &&
                                studentData.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="center" >{i + 1}</TableCell>
                                        <TableCell align="center" >{item.name}</TableCell>
                                        <TableCell align="center" >{item.subject}</TableCell>
                                        <TableCell align="center" >
                                        {
                                           item.attendance ==='p' ? <Typography component={'span'} sx={{px:2,py:1,background:"#21aa25",color:'white'}}>Present</Typography>:
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
        </Box>
    )
}

export default ViewAttendanceTable