import React from 'react'
import { useState} from 'react'
import {useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {BsFillChatDotsFill} from "react-icons/bs";


function Login({onLogin}) {
    const navigate = useNavigate() 

    const [Email, setEmail] = useState("")
    const [Password, setPass] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const userDetails = {
            "email": Email,
            "password": Password,
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
                setPass('')
            }else{
                navigate("/home", {replace: true})
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
            
            <label htmlFor='password' className='input-label' style={{marginTop: '20px'}}>Password: </label>
            <br/>
            <input
            className='input-field'
            autoComplete="off"
            name='password'
            required
            type='text'
            value={Password}
            onChange={(e) => setPass(e.target.value)}
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