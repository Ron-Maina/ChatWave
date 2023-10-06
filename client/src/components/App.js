import './App.css';
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Contacts from './Contacts';
import Chat from './Chat';
import NewContact from './NewContact';
import UpdateProfile from './UpdateProfile';


function App() {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState({})
  const [chatContact, setChatContact] = useState([])
  const [chatID, setchatID] = useState([])

  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((user) => setUser(user));
      } else{
        console.log('Session not found')
      }
    });
  }, []);

  // useEffect(() => {
  //   fetch(`/contact-session/${user.id}`)
  //   .then((response) => {
  //     if (response.ok) {
  //       response.json()
  //       .then((data) => {
  //         data.chats.map(chat => {
  //           setChatContact([...chatContact, {"name": chat.contact.name, "profile_pic": chat.contact}])
  //         })
  //       });
  //     } else{
  //       console.log('Session not found')
  //     }
  //   });
  // }, [user])

  function handleLogin(user){
    setUser(user)
  }

  function renderChat(contact){
    setChat(contact)
  }
 
  function handleUpdate(data){
    setUser(data)
  }

  function renderChatContact(contact){
    if (chatID.includes(contact.id)){
      return null
    }else{
      setchatID([...chatID, contact.id])
      setChatContact([...chatContact, contact])
    }  
  }

  return (
    <Routes>
      <Route path="/" element = {<Signup />}/>
      <Route path="/login" element = {<Login onLogin={handleLogin}/>}/>
      <Route exact path="/home" element = {<Home chatContact={chatContact} user={user}/>}/>
      <Route path="/contacts" element = {<Contacts onChat={renderChat} user={user}/>}/>
      <Route path="/chat" element = {<Chat chat={chat} onChat={renderChatContact} user={user}/>}/>
      <Route path="/new-contact" element = {<NewContact user={user}/>}/>
      <Route path="/update-profile" element = {<UpdateProfile user={user} onUpdate={handleUpdate}/>}/>

    </Routes>
  );
}

export default App;
