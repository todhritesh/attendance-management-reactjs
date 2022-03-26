import { Box, Card, Container , CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { generateDate } from '../../../helper/generateDate'


function TeacherDashboard() {
    const navigate = useNavigate()
    function handleClick(page) {
        navigate(page)
    }
    return (
        <Box component={Container} sx={{minWidth:'100vw',mt:15}}>
            <Typography variant='h3' >
                Teacher's Dashboard
            </Typography>
            <Divider/>
            <Divider/>
            <Divider/>
            <Divider/>
            <Grid item container lg={11} md={8} sx={{ mt: 5 }} spacing={2}>
                <Grid item xs={12} sm={6} md={4} >
                    <Card>
                        <CardActionArea onClick={()=>handleClick('/teacher/manage-students')} >
                            <CardContent>
                                <Typography variant="h6">Manage Student</Typography>
                                <Typography variant="p" sx={{ fontSize: '50px', fontWeight: 'lighter' }}>345</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <Card>
                        <CardActionArea onClick={()=>handleClick('/teacher/start-attendance')} >
                            <CardContent>
                                <Typography variant="h6">Start Attendance</Typography>
                                <Typography variant="p" sx={{ fontSize: '50px', fontWeight: 'lighter' }}>{generateDate()}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <Card>
                        <CardActionArea onClick={()=>handleClick('/teacher/view-attendance')} >
                            <CardContent>
                                <Typography variant="h6">View Previous</Typography>
                                <Typography variant="p" sx={{ fontSize: '50px', fontWeight: 'lighter' }}>Attendance</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TeacherDashboard