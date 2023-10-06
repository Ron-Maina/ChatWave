import React, {useState} from 'react'
import Sidebar from './Sidebar';

function Chat({chat, onChat, user}) {
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
        if (body !== ""){
            onChat(chat.id)
        }
        
        let chat_id = {
            "message": body,
            "contact_id": chat.id
        }
        fetch('/chats', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chat_id)
        })
        .then(res => res.json())
        setBody('')

        // fetch(`/chat-session/${user.id}`)
        // .then(res => res.json())
        // .then(data => setMessages(data.chats))

    }
    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange} user={user}/>
            <div>
                <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto', width: '500px'}} id='profile'>
                    <div className='headings-light' style={{display: 'flex'}}>
                        <img className = 'image' src={chat.profile_pic} alt='profile_pic'/>
                        <h3 style={{fontSize: '25px', marginTop: '10px', marginLeft: '15px'}}>{chat.name}</h3>
                    </div>
                    
                </div>
                
                <hr className={isActive ? 'slide-out' : 'slide-in'}/>
                <form className={isActive ? 'slide-out' : 'slide-in'} 
                id='new-message' onSubmit={handleSubmit}>
                <label htmlFor="message" className='input-label'></label>
                    <input
                    type="text"
                    name="message"
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