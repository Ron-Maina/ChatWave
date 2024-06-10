import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {BsFillChatDotsFill} from "react-icons/bs";
import Button from 'react-bootstrap/Button';

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";


function Signup() {

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
 
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    
    const handlePasswordChange = (password) => (event) => {
        setValues({ ...values, [password]: event.target.value });
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleEmail = event => {
        if (!isValidEmail(event.target.value)) {
          setError('Email is invalid');
        } else {
          setError(null);
        }
    
        setEmail(event.target.value);
    };

    const navigate = useNavigate()
    const [refreshPage, setRefreshPage] = useState(false);
    
    function loginPage(){
        navigate("/loginpage")
    }

    function handleSubmit(e){
        e.preventDefault()
        const signupDetails = {
            "name": name,
            "email": email,
            "number": number,
            "password": values.password
        }
        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(signupDetails),
        }).then((res) => {
            if (res.status === 200) {
                setRefreshPage(!refreshPage);
                alert('Successful signup')
                loginPage()
            } else {
                alert('Email or Number already exists')
            }
        });
    }
  
    return (
        <div className='frame' id='authenticate'>
            <div style={{textAlign: 'center'}}>
                <h2 id='signup-text'>ChatWave</h2>
                <div style={{color: 'white', fontSize: '40px'}}><BsFillChatDotsFill/></div>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className='input-label'>Email Address:</label>
                <br />
                <input
                required
                className='input-field'
                autoComplete="off"
                type='email'
                id="email"
                name="email"
                onChange={handleEmail}
                value={email}
                />
                {error && <h7 style={{color: 'red'}}>{error}</h7>}
                
                <label htmlFor="name" className='input-label'>First Name:</label>
                <br />
                <input
                required
                type='text'
                className='input-field'
                autoComplete="off"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                />

                <label htmlFor="number" className='input-label'> Phone Number(10 digits):</label>
                <br />
                <input
                required
                className='input-field'
                autoComplete="off"
                id="number"
                name="number"
                maxLength={10}
                minLength={10}
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                />

                <label htmlFor="password" className='input-label'> Password:</label>
                <br />
                <Input
                    required
                    minLength={4}
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

                <br />
                <div><Button variant="primary" type='submit'>Submit</Button>{' '}</div>
            </form>

            <div style={{textAlign: 'center'}}>
                <p>
                    <Link to = "/loginpage" style={{color: "white"}}>Already have an account? Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup