import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'


function Contacts({onChat}) {
    const navigate = useNavigate()

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch('/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
    }, [contacts])
    const [isActive, setIsActive] = useState(false);

    function renderChange(state){
        if (state === true){
          setIsActive(true);
        } else {
          setIsActive(false)
        }
    }

    function handleClick(contact){
        onChat(contact)
        navigate('/chat')

    }
    
    function handleDelete(id){
        fetch(`/contacts/${id}`, {
            method: 'DELETE',   
        })
        .then(res => {
            if (res.ok){
                alert('Deleted successfully')
            }
        })
        let new_contacts = contacts.filter(contact => contact.id !== id)
        setContacts(new_contacts)
    }
   
    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange}/>
            <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
                <h2 className='headings-light'>Contacts</h2>
                <div className='info' >
                    {contacts.map(contact => (
                        <div key={contact.id} 
                        style={{display: 'flex', gap: '30px', margin: '20px'}}>

                            <div style={{display: 'flex', gap: '30px'}} onClick={() => handleClick(contact)}>
                                <img style= {{height: '50px', width: '50px', borderRadius: '50%'}}src={contact.profile_pic} alt='profile_pic'/>
                                <p style={{margin: '10px'}}>{contact.name}</p>
                            </div>

                            <div 
                            style={{color: 'red', right: '70px', position: 'absolute', marginTop: '10px'}}
                            onClick={() => handleDelete(contact.id)}>
                                <i class="fa fa-trash"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contacts