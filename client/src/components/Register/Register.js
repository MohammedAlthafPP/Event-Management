import React, { Fragment, useEffect, useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Typography} from '@mui/material';
import {Link,useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {register,clearErrors } from "../../redux/action/userAction";
import {toast } from 'react-toastify';
import "./Register.css";


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, success ,message} = useSelector((state) => state.user);
    const [visible, setVisible] = useState(false);
    const togglePassword=()=>{
        setVisible(!visible)
       
    }
    const loginHandler=()=>{
        navigate('/admin/login')
    }
    const Icon = visible ? VisibilityOffIcon : RemoveRedEyeIcon;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        if(success){
          toast.success(message);
          navigate('/admin/login')
        }
        if(error){
          toast.error(error.message);
          dispatch(clearErrors());
        }
      }, [dispatch,success,message,error,navigate])


    const loginSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);

        dispatch(register(myForm));
      
    }


  return (
   
    <Fragment>
        <div className="loginContainer" >
            <div className="loginBox" >
                <Typography component={'h4'}>Sign-Up</Typography>
                <form action="" className="loginForm" onSubmit={loginSubmit}>
                    <div className='logiName'>
                        <FaceIcon/>
                        <input type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required
                         />

                    </div>
                    <div className='loginEmail'>
                        <MailOutlineIcon/>
                        <input type="email" 
                        placeholder='Email' 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        />

                    </div>
                    
                    <div className='loginPawword'>
                        <LockOpenIcon/>
                        <input type={visible ? "text" : "password"} placeholder='Password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        />
                       <span className='password-Togle-Icon' hidden onClick={togglePassword}><Icon style={{display: password === "" ? "none" : "block"}} /></span> 
                    </div>
                   
                    <Link to="/admin/login">Already a user? <b onClick={loginHandler}>Login</b></Link>
                <input type="submit" value="Register" className="loginBtn" />
                </form>
            </div>
        </div>

    </Fragment>
  )
}



export default Register