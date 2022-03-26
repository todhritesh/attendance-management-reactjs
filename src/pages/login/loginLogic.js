import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller , useForm } from 'react-hook-form'
import {auth , db} from '../../firebase-config'
import { signInWithEmailAndPassword , onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import {onValue , ref , orderByChild , equalTo , query, update} from 'firebase/database'
import {toast} from 'react-toastify'


const schema = yup.object().shape({
    username:yup.string().email().required(),
    password:yup.string().required()
})

 function formSubmit(data,reset,setUser , user , navigate){
    const {username , password} = data
    const usersRef = ref(db , 'am_users');
    const q = query(usersRef , orderByChild('username') , equalTo(username));
    onValue(q , async (snap) => {
        const isValid = snap.size;
        if(isValid){
            try{
                let role 
                let verified 
                let signup;
                let id;
                let subject;
                snap.forEach(item=>{
                    role = item.val().role
                    verified = item.val().verified;
                    signup = item.val().signup
                    id = item.key
                    subject = item.val()?.subject
                })
                if(!verified){
                    toast.error("Your form is under review")
                    return ;
                }
                if(role==='admin'){
                    const curr_user = await signInWithEmailAndPassword(auth , username , password);
                    curr_user['role'] = role
                    setUser(curr_user)
                    navigate('/admin')
                }
                if(role==='teacher'){
                    if(signup===0){
                        const curr_user = await createUserWithEmailAndPassword(auth , username , password);
                        curr_user['user']['role'] = role
                        curr_user['user']['subject'] = subject
                        const usersRef = ref(db , `am_users/${id}`);
                        update(usersRef , {signup:1});
                        setUser(curr_user.user)
                        navigate('/teacher')
                    }else{
                        const curr_user = await signInWithEmailAndPassword(auth , username , password);
                        curr_user['user']['role'] = role
                        curr_user['user']['subject'] = subject
                        setUser(curr_user['user'])
                        navigate('/teacher')
                    }
                }
            }catch(err){
                console.log(err.message)
                toast.error("Invalid username or password")
            }
        }else{
            toast.error("Invalid username or password")
            return
        }
    })
    // const user = await signInWithEmailAndPassword(auth , username , password)
    // console.log(user)

}

export {
    schema , Controller , useForm , yupResolver ,formSubmit
}
