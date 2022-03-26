import { Box, Card, Container, CardActionArea, CardContent, Divider, Grid, Typography, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Button, Paper } from '@mui/material'
import { onValue, ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase-config'
import { userContext } from '../../../helper/context'
import AddNewStudent from './manageStudentLogic'


function ManageStudents() {
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
                    <Button onClick={()=>setOpen(true)} variant="contained" color="success" sx={{m:1}} >Add New Student</Button>
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
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                    }
                </TableContainer>
                </Paper>
            </Grid>
            <AddNewStudent open={open} setOpen={setOpen} />
        </Box>
    )
}

export default ManageStudents