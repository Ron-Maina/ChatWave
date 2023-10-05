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
      <div className='home-screen' style={{ display: 'flex' }}>
        <Sidebar onchange={renderChange}/>
        <div id={isActive ? 'slide-out' : 'slide-in'}>
          <h2 className='headings-light'>Chats</h2>
        </div>
       
      </div>
  )
}

export default Home