import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Search from './Search';

function Home({chatContact, user}) {
    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    
    function renderChange(state){
      if (state === true){
        setIsActive(true);
      } else {
        setIsActive(false)
      }
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
                <img className= 'image' src={contact.profile_pic} alt='profile_pic'/>
                <p style={{margin: '15px'}}>{contact?.name}</p>
                <i style={{color: 'red', position: 'absolute', right: '30px', marginTop: '17px'}} class="fa fa-trash"></i>
              </div>
              
            ))}
            
            
          </div>
          
      </div>
    </div>
  )
}

export default Home