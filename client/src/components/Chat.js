import React, {useState} from 'react'
import Sidebar from './Sidebar';

function Chat({chat}) {
    const [isActive, setIsActive] = useState(false);
    const [body, setBody] = useState("");
    
    function renderChange(state){
      if (state === true){
        setIsActive(true);
      } else {
        setIsActive(false)
      }
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log('hi')
        setBody('')
    }
    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange}/>
            <div>
                <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto', width: '500px'}} id='profile'>
                    <img className = 'image' src={chat.profile_pic} alt='profile_pic'/>
                    <h3 style={{fontSize: '1.5em', marginTop: '10px'}}>{chat.name}</h3>
                    <i style={{marginTop: '12px', marginRight: '100px'}} class="fa fa-phone"></i>
                    <i class="fa fa-video-camera"></i>

                    <hr size='10'/>
                </div>
                <form className={isActive ? 'slide-out' : 'slide-in'} 
                id='new-message' onSubmit={handleSubmit}>
                    <input
                    type="text"
                    name="body"
                    autoComplete="off"
                    value={body}
                    size='50'
                    onChange={(e) => setBody(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}

export default Chat