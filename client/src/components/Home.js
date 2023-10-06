import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Search from './Search';
import {useNavigate } from 'react-router-dom'

function Home({conversations, user, onChat}) {
    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    const navigate = useNavigate()

    function renderChange(state){
      if (state === true){
        setIsActive(true);
      } else {
        setIsActive(false)
      }
    }

    const filtered_chats = conversations.filter(chat => {
      return chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    function handleDelete(id){
      fetch(`/chats/${id}`,{
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok){
            alert('Deleted successfully')
        }
      })
    }
    function handleClick(contact){
      onChat(contact)
      navigate("/chat")
    }

  return (
    <div className='home-screen'>
      <Sidebar onchange={renderChange} user={user}/>
      <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
          <h2 className='headings-light'>ChatWave</h2>
          <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <div className='info'>
            <h5 className='headings-light' style={{fontSize: '25px'}}>Chats</h5>
            {filtered_chats.map(contact => (
              <div key={contact.id} id='profile' style={{marginLeft: '15px', marginTop: '15px'}} onClick={() => handleClick(contact)}>
                <img className= 'image' src={contact.profile_pic} alt='profile_pic'/>
                <p style={{margin: '15px'}}>{contact?.name}</p>
                <i onClick={() => handleDelete(contact.id)} style={{color: 'red', position: 'absolute', right: '30px', marginTop: '17px'}} class="fa fa-trash"></i>
              </div>
              
            ))}
            
            
          </div>
          
      </div>
    </div>
  )
}

export default Home