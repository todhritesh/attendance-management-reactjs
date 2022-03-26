import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import {makeStyles} from '@mui/styles';
import { Box } from '@mui/system';
import Apply from '../../pages/apply/Apply';
import { userContext } from '../../helper/context';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { SettingsSuggestRounded } from '@mui/icons-material';

const useStyles = makeStyles({
    root:{
        background:"#2C3A47",
        padding:"15px",
    },
    textColor:{
        color:'#f5f6fa',
        fontSize:'30px'
    }
})


function Navbar() {
    const navigate = useNavigate()
    const [openApplyDialog , setOpneApplyDialog] = useState(false);
    const classes = useStyles()
    const {user , setUser} = useContext(userContext)
    const handleSignout = ()=>{
        signOut(auth) 
        console.log('first')
        setUser('')
         navigate("/login")
    }
  return (
    <AppBar className={classes.root}>
        <Toolbar>
            <IconButton>
                <Typography className={classes.textColor} >Attendance</Typography>
            </IconButton>
            <Box sx={{flexGrow:1}} />
            {!user && <Button onClick={()=>setOpneApplyDialog(true)} variant="contianed">Apply</Button> }
            {user && <Button onClick={handleSignout} variant="contianed">Logout</Button> }
        </Toolbar>
        <Apply openApplyDialog={openApplyDialog} setOpneApplyDialog={setOpneApplyDialog} />
    </AppBar>
  )
}

export default Navbar