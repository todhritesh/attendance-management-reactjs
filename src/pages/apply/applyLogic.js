import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller , useForm } from 'react-hook-form'
import {db} from '../../firebase-config'
import {push , set , ref } from 'firebase/database'
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    username:yup.string().email().required(),
    // password:yup.string().required(),
    name:yup.string().required(),
})

async function formSubmit(data , setOpneApplyDialog){
    const usersRef = ref(db , 'am_users');
    const newUser = push(usersRef);
    data['role'] = 'teacher'
    data['verified'] = 0
    data['signup'] = 0
    set(newUser , data);
    toast.success("Your form was successfully submitted")
    setOpneApplyDialog(false)
}

export {
    schema , Controller , useForm , yupResolver ,formSubmit
}
