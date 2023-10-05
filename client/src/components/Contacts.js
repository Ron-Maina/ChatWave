import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'


function Contacts() {
    const [contacts, setContacts] = useState([])

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

    function handleClick(){
        console.log('hi')
    }
    function handleDelete(){
        return
    }
   
    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange}/>
            <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
                <h2 className='headings-light'>Contacts</h2>
                <div className='info' >
                    {contacts.map(contact => (
                        <div key={contact.id} 
                        style={{display: 'flex', gap: '30px', margin: '20px'}}
                        onClick={handleClick}>
                            <img style= {{height: '50px', width: '50px', borderRadius: '50%'}}src={contact.profile_pic} alt='profile_pic'/>
                            <p style={{margin: '10px'}}>{contact.name}</p>
                            <div 
                            style={{color: 'red', right: '70px', position: 'absolute', marginTop: '10px'}}
                            onClick={handleDelete}>
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