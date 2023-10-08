import './sidebar.css'
import React from 'react'
import { useState } from 'react';
import {
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar({onchange, user}) {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
      setSidebarOpen(true);
      handleOver()
    };

    const handleSidebarClose = () => {
      setSidebarOpen(false);
      handleOut()
    };
    
    function handleOver(){
      setIsActive(true)
    }
    onchange(isActive)

    function handleOut(){
        setIsActive(false)
    }
    onchange(isActive)

    function Logout(){
        fetch("/logout", {
            method: "DELETE",
        })

        navigate("/loginpage", {replace: true})
    }

    return (
        <div id='sidebar' onMouseLeave={handleSidebarClose}>
            {!sidebarOpen ? (
                <>
                    <CDBSidebarHeader onMouseEnter={handleSidebarOpen} onMouseLeave={handleOut}>
                        <i className={"fa fa-user fa-large"}> {user?.name}</i>
                        <p></p>
                    </CDBSidebarHeader>
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu id = 'sidebar-menu'>

                            <Link to="/homepage">
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="home"></CDBSidebarMenuItem>
                            </Link>

                            <Link to="/contactspage">
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="address-book"></CDBSidebarMenuItem>
                            </Link>
                            
                            <Link to="/new-contactpage">
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="plus-circle"></CDBSidebarMenuItem>
                            </Link>

                            <CDBSidebarMenuItem id= 'sidebar-items' icon="times" onClick={Logout}></CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <Link to="/settingspage">
                            <div className="sidebar-btn-wrapper" style={{padding: '250px 5px',}}>
                                <i style={{color:'white'}} class="fa fa-info"></i>
                            </div>
                        </Link>
                    </CDBSidebarFooter>
                </>
            ) : (
                <>  
                    <Link to="/update-profilepage">
                    <CDBSidebarHeader>
                        <i className="fa fa-user fa-large"> {user?.name}</i> 
                    </CDBSidebarHeader>
                    </Link>

                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu id = 'sidebar-menu'>

                            <Link to="/homepage">
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="home">Home</CDBSidebarMenuItem>
                            </Link>

                            <Link to="/contactspage">
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="address-book">Contacts</CDBSidebarMenuItem>
                            </Link>

                            <Link to="/new-contactpage">
                            <CDBSidebarMenuItem id= 'sidebar-items' icon="plus-circle">Add Contacts</CDBSidebarMenuItem>
                            </Link>

                            <CDBSidebarMenuItem id= 'sidebar-items' icon="times" onClick={Logout}>Logout</CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    
                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <Link to="/settingspage">
                            <div className="sidebar-btn-wrapper" style={{padding: '250px 5px',}}>
                                <i i class="fa fa-info"> About</i>
                            </div>
                        </Link>
                    </CDBSidebarFooter>
                    
                </>
            )}
        </div>
        
    );
    
    
}

export default Sidebar