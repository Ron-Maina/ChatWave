import React, {useState} from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button';



function UpdateProfile({user, onUpdate}) {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [number, setNumber] = useState(user?.number);
    const [pic, setPic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU');
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

        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                number: number,
                profile_pic: pic})
        })
        .then((response) => {
                if (!response.ok) {
                    alert("failed to Update");
                }else{
                    alert("Succesful Update");
                    return response.json();
                }
                
        })
        .then((responseData) => {
            onUpdate(responseData);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        setEmail('')
        setName('')
        setNumber('')
    }

  return (
    <div className='home-screen'>
        <Sidebar onchange={renderChange} user={user}/>
        <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
            <h4 style={{fontSize: '1.5em'}} 
            className='headings-light'>Profile Update</h4>
            
            <form onSubmit={handleSubmit} className='input-style' id='searchbar'>
                <label htmlFor="name" className='input-label'>Name:</label>
                <input
                className='input-field'
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
                name="number"
                maxLength={10}
                minLength={10}
                required
                autoComplete="off"
                value={number}
                size='30'
                onChange={(e) => setNumber(e.target.value)}
                />
                <label htmlFor="pic" className='input-label'>Profile pic:</label>
                <input
                className='input-field'
                name="profile_pic"
                autoComplete="off"
                value={pic}
                size='30'
                onChange={(e) => setPic(e.target.value)}
                />
                <div style={{marginTop: '20px'}}>
                    <Button variant="info" type='submit'>Add</Button>{' '}   
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateProfile