import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from 'yup'
import {BsFillChatDotsFill} from "react-icons/bs";
import Button from 'react-bootstrap/Button';


function Signup() {
    const navigate = useNavigate()
    const [refreshPage, setRefreshPage] = useState(false);
    
    function loginPage(){
        navigate("/login")
    }

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        name: yup.string().required("Must enter a name"),
        password: yup.string().required("Must Enter Password"),
        number: yup.number().positive().min(10).required("Must Enter Phone Number")
    });

    const formik = useFormik({
        initialValues: {
        name: "",
        email: "",
        number: "",
        password: "",
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status === 200) {
                    setRefreshPage(!refreshPage);
                    alert('Successful signup')
                    loginPage()
                } else {
                    alert('Email or Number already exists')
                }
            });
        },
    });

    return (
        <div className='frame' id='authenticate'>
            <div style={{textAlign: 'center'}}>
                <h2 id='signup-text'>ChatWave</h2>
                <div style={{color: 'white', fontSize: '40px'}}><BsFillChatDotsFill/></div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email" className='input-label'>Email Address:</label>
                <br />
                <input
                className='input-field'
                autoComplete="off"
                type='email'
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                />
                <p style={{ color: "red" }}> {formik.errors.email}</p>
                
                <label htmlFor="name" className='input-label'>Name:</label>
                <br />
                <input
                type='text'
                className='input-field'
                autoComplete="off"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>

                <label htmlFor="number" className='input-label'> Number:</label>
                <br />
                <input
                className='input-field'
                autoComplete="off"
                id="number"
                name="number"
                onChange={formik.handleChange}
                value={formik.values.number}
                />
                <p style={{ color: "red" }}> {formik.errors.number}</p>

                <label htmlFor="number" className='input-label'> Password:</label>
                <br />
                <input
                className='input-field'
                autoComplete="off"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                />
                <p style={{ color: "red" }}> {formik.errors.password}</p>
                <div><Button variant="primary" type='submit'>Submit</Button>{' '}</div>
            </form>
            <div style={{textAlign: 'center'}}>
                <p>
                    <Link to = "/login" style={{color: "white"}}>Already have an account? Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup