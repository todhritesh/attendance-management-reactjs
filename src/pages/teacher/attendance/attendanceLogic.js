import {useForm , Controller} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { userContext } from '../../../helper/context'
import {db} from '../../../firebase-config';
import {ref , push , set, update, onValue} from 'firebase/database'
import { toast } from 'react-toastify'
import { generateDate } from '../../../helper/generateDate'


function AddNewStudent({open , setOpen ,setAttendanceData , attendanceData}){
    const {user} = useContext(userContext)
    const schema = yup.object().shape({
        name:yup.string().required(),
    })
    const { control, handleSubmit, formState:{errors} , reset } = useForm({
        resolver: yupResolver(schema),
        mode:'onChange',
        defaultValues:{
            name:'',
        }
    })

    const formSubmit = async (data) => {

        const studentsRef = ref(db , `am_students/${user.uid}`);
        const newStudent = push(studentsRef);
        data['subject'] = user.subject;
        set(newStudent , data)

        
        const attendanceRef = ref(db , `attendance/${user.uid}/${generateDate()}`);
        
        const newAttendance = push(attendanceRef);
        data['id'] = newStudent.key;
        data['attendance'] = "";
        set(newAttendance , data)
        toast.success("Student added successfully")
        reset()
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={()=>setOpen(false)} maxWidth='xs'>
        <DialogTitle>Apply For Job</DialogTitle>
        <DialogContent>
            <Grid item container component='form' onSubmit={handleSubmit((d) => formSubmit(d))} spacing={3}>
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

export default AddNewStudent


function handlePresentAbsent(key , user , d) {
    console.log(d)
    const attendanceRef = ref(db , `attendance/${user.uid}/${generateDate()}/${key}`)
    update(attendanceRef , {attendance:d})
}

export {
    handlePresentAbsent
}