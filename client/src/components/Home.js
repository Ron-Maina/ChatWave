import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Search from './Search';
import {useNavigate } from 'react-router-dom'


function Home({chatContact, user, onChat}) {
    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    
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

    const filtered_chats = chatContact.filter(chat => {
      return chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

  return (
    <div className='home-screen'>
      <Sidebar onchange={renderChange} user={user}/>
      <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
          <h2 className='headings-light'>ChatWave</h2>
          <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <div className='info'>
            <h5 className='headings-light' style={{fontSize: '25px'}}>Chats</h5>
            {filtered_chats.map(contact => (
              <div key={contact.id} id='profile' style={{marginLeft: '15px', marginTop: '15px'}}>
                <img className= 'image' src={contact?.profile_pic} alt='profile_pic'/>
                <p onClick={() => handleClick(contact)} style={{margin: '10px'}}>{contact?.name}</p>
                <i style={{color: 'red', position: 'absolute', right: '40px', marginTop: '12px'}} class="fa fa-trash"></i>
              </div>
              
            ))}
            
            
          </div>
          
      </div>
    </div>
  )
}

export default Home