import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Button from 'react-bootstrap/Button';


function NewContact() {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    
    function renderChange(state){
      if (state === true){
        setIsActive(true);
      } else {
        setIsActive(false)
      }
    }

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
        .then((res) => {
            if (res.status === 200) {
                alert('Added successfully')
            } else {
                alert('Contact already exists')
            }})
        .then(data => console.log(data))
    }

    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange}/>
            <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
                <h2 className='headings-light'>Add Contact</h2>
                <form onSubmit={handleSubmit} id='add-contact'>
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
                    <label htmlFor="message" className='input-label'>Email:</label>
                    <input
                    className='input-field'
                    type="text"
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
                    type="text"
                    name="number"
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