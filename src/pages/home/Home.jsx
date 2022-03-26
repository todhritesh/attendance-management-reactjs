import { Box, Typography } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles'
import { createTheme } from '@mui/material'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(()=>{
    var theme = createTheme()
    return {
    root:{
        minWidth:'100vw',
        minHeight:'100vh',
        backgroundImage: "linear-gradient(to left top, #f951b2, #f34ebc, #ec4cc7, #e34cd2, #d74edd, #d64cdd, #d44add, #d348dd, #dd41d2, #e53ac6, #ec34bb, #f22faf)",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'0 30px'
   },
   textStyling:{
       fontWeight:'lighter',
       color:'white',
       textAlign:'center',
       [theme.breakpoints.up('lg')]:{
           fontSize:'130px',
       },
       [theme.breakpoints.down('lg')]:{
            fontSize:'100px'
       },
       [theme.breakpoints.down('md')]:{
            fontSize:'60px'
       },
   },
   buttonStyling:{
       padding:'30px 40px',
       fontSize:'30px',
       cursor:'pointer',
       background:'#1d0c98',
       color:'white',
       borderRadius:'20px',
       outline:'none',
       border:'none',
       textDecoration:'none',
       '&:hover':{
           background:'#0f007a',
           transitionDuration:'.5s'
       }
   }
}})

function Home() {
    const classes = useStyles()
  return (
    <Box className={classes.root}>
        <Box style={{textAlign:'center',marginTop:'-10%'}} >
            <Typography component={"div"} className={classes.textStyling} variant="p">
                Manage Attendance At One Place
            </Typography>
            <div style={{marginTop:'30px'}}>
                <Typography variant="button" component={Link} to="/login" className={classes.buttonStyling} >Get Started</Typography>
            </div>
        </Box>
    </Box>
  )
}

export default Home