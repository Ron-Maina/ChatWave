import React from 'react'
import { useState} from 'react'
import {useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {BsFillChatDotsFill} from "react-icons/bs";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";


function Login({onLogin}) {

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
 
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    
    const handlePasswordChange = (password) => (event) => {
        setValues({ ...values, [password]: event.target.value });
    };

    const navigate = useNavigate() 

    const [Email, setEmail] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const userDetails = {
            "email": Email,
            "password": values.password,
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails),
        })
        .then((response) => {
            if (!response.ok) {
                alert("Invalid Email or Password");
                setEmail('')
                setValues({ ...values, password: ''});

            }else{
                navigate("/homepage", {replace: true})
                return response.json();
            }   
        })
        .then(user => onLogin(user))
        .catch((error) => {
            console.error("Error:", error);
        });
        
    }

  return (
    <div className='frame' id='authenticate'>
        <div style={{textAlign: 'center'}}>
            <h2 id='signup-text'>ChatWave</h2>
            <div style={{color: 'white', fontSize: '40px'}}><BsFillChatDotsFill/></div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "10%"}}>
            <label htmlFor='email' className='input-label'>Email: </label>
            <br/>
            <input
            className='input-field'
            name='email'
            required
            type='text'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            
            <label htmlFor="password" className='input-label' style={{marginTop: '20px'}}> Password:</label>
                <br />
                <Input
                    style={{color: 'white'}}
                    className='input-field'
                    type={values.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    value={values.password}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                style={{color: 'white'}}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />

            <div style={{marginTop: '20px'}}>
                <Button variant="info" type='submit'>Login</Button>{' '}   
            </div>
            <br/>
            <p>
                <Link to = "/" style={{color: "white"}}>New Account?</Link>
            </p>
        </form>
    </div>
  )
}

export default Login