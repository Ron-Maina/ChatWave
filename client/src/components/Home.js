import React, {useState} from 'react'
import Sidebar from './Sidebar'

function Home({user}) {
    const [isActive, setIsActive] = useState(false);
    
    function renderChange(state){
      if (state === true){
        setIsActive(true);
      } else {
        setIsActive(false)
      }
    }
  return (
    <div className='home-screen'>
      <Sidebar onchange={renderChange}/>
      <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
          <h2 className='headings-light'>ChatWave</h2>
          <div>
            <h4 style={{marginTop: '150px'}}>Chats</h4>
            <div id='profile'>
              <img className= 'image' src={user.profile_pic} alt='profile_pic'/>
              <p style={{margin: '10px'}}>{user.name}</p>
            </div>
            <div style={{color: 'red', right: '70px', position: 'absolute'}}>
              <i class="fa fa-trash"></i>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default Home