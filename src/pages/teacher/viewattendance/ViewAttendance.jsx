import { Box, Card, Container, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material'
import { onValue , ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase-config'
import { userContext } from '../../../helper/context'


function ViewAttendance() {
    const { user } = useContext(userContext)
    const [attendanceDate, setAttendanceDate] = useState([])
    const navigate = useNavigate()
    function handleClick(key) {
        console.log(key)
        navigate(`/teacher/view-attendance/date`,{state:{key}})
    }

    const getData = () => {
        const attendanceRef = ref(db, `attendance/${user.uid}`)

        onValue(attendanceRef, snap => {
            let data = []
            snap.forEach(item => {
                data = [...data, item.key]
            })
            setAttendanceDate(data);
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <Box component={Container} sx={{ minWidth: '100vw', mt: 15 }}>
            <Typography variant='h3' >
                Teacher's Dashboard
            </Typography>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Typography variant="h4" sx={{ mt: 3 }} >View Attendance</Typography>
            <Grid item container lg={11} md={8} sx={{ mt: 5 }} spacing={2}>
                {
                    attendanceDate.map((item, i) => (
                        <Grid key={i} item sm={3} xs={6}>
                            <Card>
                                <CardActionArea onClick={() => handleClick(item)} >
                                    <CardContent>
                                        <Typography fontWeight='bold' variant="body1">{item}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default ViewAttendance