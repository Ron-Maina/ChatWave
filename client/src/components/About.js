import React, {useState} from 'react'
import Sidebar from './Sidebar'

function About({user}) {
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
            <Sidebar onchange={renderChange} user={user}/>
            <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto'}}>
                <h2 style={{fontSize: '25px'}} className='headings-light'>About Us</h2>
                <div style={{marginLeft: '15px'}}>
                    <p >ChatWave is your ultimate destination for seamless and engaging conversations in the digital realm. 
                        Designed to revolutionize the way we connect and communicate, ChatWave offers a dynamic and user-friendly platform for individuals, 
                        friends, families, and teams to come together and converse in real-time.
                    </p>
                    <h5 className='info'>Key Features</h5>
                    <p>
                        Intuitive Interface: ChatWave boasts a clean and intuitive interface that ensures a hassle-free user experience. 
                        Navigating through conversations,and contacts has never been this easy.
                    </p>
                    <p>
                        Sidebar Navigation: Our intuitive sidebar makes it easy to access your chats, groups, and contacts at a glance. 
                        It provides quick and convenient navigation, ensuring you can effortlessly switch between conversations and stay organized.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About