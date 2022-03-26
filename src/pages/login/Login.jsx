import { Box, Paper , CardContent,Grid, Typography, Divider, FormControl, TextField, Button } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userContext } from '../../helper/context'
import Apply from '../apply/Apply'
import { schema , Controller , useForm , yupResolver , formSubmit} from './loginLogic'

function Login() {
    const navigate = useNavigate()
    const {user , setUser} = useContext(userContext);
    const { control, handleSubmit, formState:{errors} , reset } = useForm({
        resolver: yupResolver(schema),
        mode:'onChange',
        defaultValues:{
            username:'',
            password:''
        }
    })
    // const location = useLocation()
    // useEffect(()=>{
    //     // if(user || location.pathname=='/admin'){
    //     //     console.log(user)
    //     //     navigate('/admin')
    //     // }
    //     if(!user){
    //         location?.state?.unauthorized && toast.error("You are unauthorized")
    //         navigate(location.pathname , {unauthorized:false})
    //     }
    // },[])
  return (
      <Grid item lg={6} md={8} sx={{ mt:25 , mx:'auto' , px:3 }}>
          <Box variant="elevation" elevation={10} square={true} component={Paper}>
              <Typography textAlign={'center'} variant="h3">Login Here</Typography>
              <CardContent>
                  <Divider sx={{mb:2}} />
                <Grid item container component='form' onSubmit={handleSubmit((d)=>formSubmit(d,reset,setUser,user , navigate))} spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography>Username</Typography>
                            <Controller
                            control={control}
                            name="username"
                            render={({field})=>(
                                <TextField helperText={errors.username?.message} error={Boolean(errors.username)} {...field} size="small" variant='outlined'/>
                            )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography>Password</Typography>
                            <Controller
                            name="password"
                            control={control}
                            render={({field})=>{
                                return <TextField helperText={errors.password?.message} error={Boolean(errors.password)} {...field} type="password" size="small" variant='outlined'/>
                            }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{textAlign:'end'}}>
                        <FormControl >
                            <Button sx={{px:5}} type='submit' variant="contained" color="success">Login</Button>
                        </FormControl>
                    </Grid>
                </Grid>
              </CardContent>
          </Box>
          <Apply/>
      </Grid>
  )
}
export default Login