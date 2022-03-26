import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ref, onValue, query, orderByChild, equalTo, } from "firebase/database";
import { db } from "../../../firebase-config";
import { AddSubjectToTeacher } from './manageTeachersLogic';
// import {} from './manageTeachersLogic'

function ManageTeachers() {
    const [openDialog, setOpenDialog] = useState({ open: false, id: '' })
    const [teacherData, setTeacherData] = useState([])
    const teachersRef = ref(db, 'am_users')
    const q = query(teachersRef, orderByChild('role'), equalTo('teacher'))
    function getData() {
        onValue(q, snap => {
            let data = []
            snap.forEach(item => {
                const value = { ...item.val(), id: item.key };
                data = [...data, value]
            })
            setTeacherData(data);
        })
    }
    console.log(teacherData)
    useEffect(() => {
        getData()
    }, [])

    return (
        <Grid item container lg={11} md={8} sx={{ mx: 'auto', mt: 15 }} spacing={2}>
            <Paper sx={{ overFlowX: 'scroll', whiteSpace: 'nowrap' }}>
                <TableContainer sx={{ width: '100vw', overFlow: 'auto' }} >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Sl no</TableCell>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Name</TableCell>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Subject</TableCell>
                                <TableCell align="center" sx={{ fontSize: '20px' }} >Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                teacherData.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="center" >{i + 1}</TableCell>
                                        <TableCell align="center" >{item.name}</TableCell>
                                        <TableCell align="center" >
                                            {item.subject || <Typography component={'span'} sx={{ background: '#ab9f9e', padding: '10px 20px' }} >Not verified</Typography>}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {
                                                item.verified === 1 ? <Typography component={'span'} sx={{ background: '#35bd35', padding: '10px 20px' }} >Verified</Typography>
                                                    :
                                                    <Button onClick={() => setOpenDialog({ open: true, id: item.id })} variant="contained" color="warning">Pending</Button>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <AddSubjectToTeacher openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Grid>
    )
}

export default ManageTeachers