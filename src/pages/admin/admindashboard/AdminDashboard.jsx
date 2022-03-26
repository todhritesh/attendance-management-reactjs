import { Box, Card, CardActionArea, CardContent, Container, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {} from './adminDashboardLogic'
function AdminDashboard() {
  const navigate = useNavigate()
  function handleClick(){
    navigate('/admin/manage-teachers')
  }
  return (
    <Box component={Container} sx={{minWidth:'100vw',mt:15}}>
    <Typography variant='h3' >
        Admin Dashboard
    </Typography>
    <Divider/>
    <Divider/>
    <Divider/>
    <Divider/>
    <Grid item container lg={11} md={8} sx={{ mt: 5 }} spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
            <Card>
                <CardActionArea onClick={handleClick} >
                    <CardContent>
                        <Typography variant="h6">Manage Teacher</Typography>
                        <Typography variant="p" sx={{ fontSize: '50px', fontWeight: 'lighter' }}>345</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    </Grid>
</Box>
  )
}

export default AdminDashboard