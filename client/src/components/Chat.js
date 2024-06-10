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
            onChat(chat)
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
        .then(data => console.log(data))
        setBody('')
    }
    return (
        <div className='home-screen'>
            <Sidebar onchange={renderChange} user={user}/>
            <div>
                <div className={isActive ? 'slide-out' : 'slide-in'} style={{overflowY: 'auto', width: '500px'}} id='profile'>
                    <div className='headings-light' style={{display: 'flex'}}>
                        <img className = 'image' src={chat?.profile_pic} alt='profile_pic'/>
                        <h3 style={{fontSize: '25px', marginTop: '10px', marginLeft: '15px'}}>{chat?.name}</h3>
                    </div>
                    
                </div>
                <hr className={isActive ? 'slide-out' : 'slide-in'}/>

                <div className={isActive ? 'slide-out' : 'slide-in'}>
                    {chat.chats?.map(texts => (
                        <div className='bubble right' style={{right: '5px', position: 'absolute'}}>
                            {texts.messages}
                            {/* <h6 style={{color: 'red'}}>{texts.created_at}</h6> */}
                        </div>
                    ))}
                    {chat.chats?.map(texts => (
                        <div className="bubble left" style={{left: '5px', top: '40px', position: 'relative'}}>{texts.responses}</div>
                    ))}
                </div>
                
                <form className={isActive ? 'slide-out' : 'slide-in'} id='new-message' onSubmit={handleSubmit}>
                    <label htmlFor="message" className='input-label'></label>
                        <input
                        placeholder='Message..'
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