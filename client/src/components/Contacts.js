import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Search from './Search'


function Contacts({onChat, user}) {
    const navigate = useNavigate()

    const [contacts, setContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    // const [id, setID] = useState("")

    useEffect(() => {
        fetch('/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
    }, [])

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
        let contactSession = {'contact': contact.id}
        fetch('/contact-session', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactSession),
        })
        .then((response) => {
            if (!response.ok) {
                console.log('failed')
            }else{
                response.json()
                .then(data => console.log(data))
                console.log('contact session created')

            }   
        })

        navigate('/chatpage')
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
        let new_contacts = contacts?.filter(contact => contact.id !== id)
        setContacts(new_contacts)
    }
   
    const filtered_contacts = contacts?.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
   
    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange} user={user}/>
            <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
                <h2 className='headings-light'>Contacts</h2>
                <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                <div className='info'>
                    {filtered_contacts?.map(contact => (
                        <div key={contact.id} 
                        style={{display: 'flex', gap: '30px', margin: '20px'}}>

                            <div id='profile' onClick={() => handleClick(contact)}>
                                <img className= 'image' src={contact?.profile_pic} alt='profile_pic'/>
                                <p style={{margin: '10px'}}>{contact?.name}</p>
                            </div>

                            <div 
                            style={{color: 'red', right: '70px', position: 'absolute', marginTop: '10px'}}
                            onClick={() => handleDelete(contact.id)}>
                                <i className='trash' class="fa fa-trash"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contacts