import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Button from 'react-bootstrap/Button';


function NewContact({user}) {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState(null);

    
    function renderChange(state){
      if (state === true){
        setIsActive(true);
      } else {
        setIsActive(false)
      }
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChange = event => {
        if (!isValidEmail(event.target.value)) {
          setError('Email is invalid');
        } else {
          setError(null);
        }
    
        setEmail(event.target.value);
    };

    function handleSubmit(e){
        e.preventDefault()
        let new_contact = {
            "name": name,
            "email": email,
            "number": number,
        }
        setEmail('')
        setName('')
        setNumber('')

        fetch('/contacts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_contact)
        })
        .then((response) => {
            if (!response.ok) {
                alert("Contact Already Exists");
            }
            alert("Added Successfully")
            return response.json();
        })
        .then((responseData) => {
            console.log("Posted Data:", responseData);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        
    }

    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange} user={user}/>
            <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
                <h2 style={{fontSize: '1.5em'}} className='headings-light'>Add Contact</h2>
                <form onSubmit={handleSubmit} className='input-style' id='searchbar'>
                    <label htmlFor="message" className='input-label'>Name:</label>
                    <input
                    className='input-field'
                    type="text"
                    name="name"
                    required
                    autoComplete="off"
                    value={name}
                    size='30'
                    onChange={(e) => setName(e.target.value)}
                    />
                    <br/>
                    <label htmlFor="email" className='input-label'>Email:</label>
                    <input
                    className='input-field'
                    type="text"
                    name="email"
                    required
                    autoComplete="off"
                    value={email}
                    size='30'
                    onChange={handleChange}
                    />
                    {error && <h7 style={{color: 'red'}}>{error}</h7>}
                    <br/>
                    <label htmlFor="number" className='input-label'>Number:</label>
                    <input
                    className='input-field'
                    type="text"
                    name="number"
                    maxLength={10}
                    minLength={10}
                    required
                    autoComplete="off"
                    value={number}
                    size='30'
                    onChange={(e) => setNumber(e.target.value)}
                    />
                    <div style={{marginTop: '20px'}}>
                        <Button variant="info" type='submit'>Add</Button>{' '}   
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewContact