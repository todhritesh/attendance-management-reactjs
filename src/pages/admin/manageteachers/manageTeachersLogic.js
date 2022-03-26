import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Typography } from "@mui/material";
import { ref, update } from "firebase/database";
import { useState } from "react";
import { db } from "../../../firebase-config";


function AddSubjectToTeacher({openDialog , setOpenDialog}){
    const handleSubmit = (id)=>{
        const teachersRef = ref(db,`am_users/${id}`);
        update(teachersRef,{
            subject,
            verified:1
        })
        setOpenDialog({open:false,id:''})
    }
    const [subject , setSubject] = useState("")
    return <Dialog open={openDialog.open} onClose={()=>setOpenDialog({open:false,id:''})}>
        <DialogTitle>
            <Typography variant="h5" component="h5" >Add Subject</Typography>
        </DialogTitle>
        <DialogContent>
            <FormControl fullWidth sx={{mb:2}}>
                <Typography>Subject Name</Typography>
                <TextField value={subject} onChange={(e) => setSubject(e.target.value)} size="small" variant="outlined" />
            </FormControl>
            <FormControl  sx={{mb:2}}>
                <Button onClick={()=>handleSubmit(openDialog.id)} variant="contained" color="success">Save Subject</Button>
            </FormControl>
        </DialogContent>
    </Dialog>
}

export {
    AddSubjectToTeacher
}