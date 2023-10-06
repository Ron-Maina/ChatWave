import React, {useState} from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button';



function UpdateProfile({user, onUpdate}) {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [number, setNumber] = useState(user.number);
    const [pic, setPic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU');
    

    
    function renderChange(state){
      if (state === true){
        setIsActive(true);
      } else {
        setIsActive(false)
      }
    }

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
                }
                alert("Succesful Update");
                return response.json();
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
        <Sidebar onchange={renderChange}/>
        <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
            <h4 style={{fontSize: '1.5em', marginLeft: '15px'}} 
            className='headings-light'>Profile Update</h4>
            
            <form onSubmit={handleSubmit} id='add-contact'>
                <label htmlFor="message" className='input-label'>Name:</label>
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
                <label htmlFor="message" className='input-label'>Email:</label>
                <input
                className='input-field'
                name="email"
                required
                autoComplete="off"
                value={email}
                size='30'
                onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <label htmlFor="message" className='input-label'>Number:</label>
                <input
                className='input-field'
                name="number"
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