import './sidebar.css'
import React from 'react'
import { useState } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
      setSidebarOpen(true);
    };
  
    const handleSidebarClose = () => {
      setSidebarOpen(false);
    };
    
    const navigate = useNavigate()

    function Logout(){
        navigate("/", {replace: true})
    }

    return (
        <div style={{marginLeft: '-20px'}} onMouseLeave={handleSidebarClose}>
            <div id='sidebar'>
                {!sidebarOpen ? (
                    <>
                        <CDBSidebarHeader onMouseEnter={handleSidebarOpen}>
                            <i className="fa fa-user fa-large"></i>
                        </CDBSidebarHeader>
                        <CDBSidebarContent className="sidebar-content">
                            <CDBSidebarMenu id = 'sidebar-menu'>
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="toggle-on"></CDBSidebarMenuItem>

                                <CDBSidebarMenuItem id= 'sidebar-items' icon="home"></CDBSidebarMenuItem>

                                <NavLink to="/contacts">
                                    <CDBSidebarMenuItem id= 'sidebar-items' icon="address-book"></CDBSidebarMenuItem>
                                </NavLink>
                                
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="plus-circle"></CDBSidebarMenuItem>
                            
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="times" onClick={Logout}></CDBSidebarMenuItem>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                        <CDBSidebarFooter style={{ textAlign: 'center' }}>
                            <div className="sidebar-btn-wrapper" style={{padding: '250px 5px',}}>
                                <i i class="fa fa-cog"></i>
                            </div>
                        </CDBSidebarFooter>
                    </>
                ) : (
                    <>
                        <CDBSidebarHeader>
                            <i className="fa fa-user fa-large"> Profile</i> 
                        </CDBSidebarHeader>
                        <CDBSidebarContent className="sidebar-content">
                            <CDBSidebarMenu id = 'sidebar-menu'>
                                <CDBSidebarMenuItem id= 'sidebar-items' icon="toggle-on">Theme</CDBSidebarMenuItem>

                                <CDBSidebarMenuItem id= 'sidebar-items' icon="home">Home</CDBSidebarMenuItem>

                                <NavLink to="/contacts">
                                    <CDBSidebarMenuItem id= 'sidebar-items' icon="address-book">Contacts</CDBSidebarMenuItem>
                                </NavLink>

                                <CDBSidebarMenuItem id= 'sidebar-items' icon="plus-circle">Add Contacts</CDBSidebarMenuItem>

                                <CDBSidebarMenuItem id= 'sidebar-items' icon="times" onClick={Logout}>Logout</CDBSidebarMenuItem>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>

                        <CDBSidebarFooter style={{ textAlign: 'center' }}>
                            <div className="sidebar-btn-wrapper" style={{padding: '250px 5px',}}>
                                <i i class="fa fa-cog"> Settings</i>
                            </div>
                        </CDBSidebarFooter>
                    </>
                )}
            </div>
        </div>
    );
    
    
}

export default Sidebar