import {Grid, Typography, Divider, FormControl, TextField, Button, DialogContent, Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import { schema , Controller , useForm , yupResolver , formSubmit} from './applyLogic'


function Apply({openApplyDialog , setOpneApplyDialog}) {
    const { control, handleSubmit, formState:{errors} , reset } = useForm({
        resolver: yupResolver(schema),
        mode:'onChange',
        defaultValues:{
            name:'',
            username:'',
            // password:''
        }
    })
    return (
        <Dialog open={openApplyDialog} onClose={()=>setOpneApplyDialog(false)} maxWidth='xs'>
            <DialogTitle>Apply For Job</DialogTitle>
            <DialogContent>
                <Grid item container component='form' onSubmit={handleSubmit((d) => formSubmit(d , setOpneApplyDialog))} spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography>Name</Typography>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <TextField helperText={errors.name?.message} error={Boolean(errors.name)} {...field} size="small" variant='outlined' />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography>Username</Typography>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field }) => (
                                    <TextField helperText={errors.username?.message} error={Boolean(errors.username)} {...field} size="small" variant='outlined' />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Typography>Password</Typography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => {
                                    return <TextField helperText={errors.password?.message} error={Boolean(errors.password)} {...field} type="password" size="small" variant='outlined' />
                                }}
                            />
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sx={{ textAlign: 'end' }}>
                        <FormControl >
                            <Button sx={{ px: 5 }} type='submit' variant="contained" color="success">Apply</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default Apply