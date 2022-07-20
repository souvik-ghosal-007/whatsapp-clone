import React from 'react'
import './Sidebar.css'
import SearchIcon from '@mui/icons-material/Search';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>

      <div className='sidebar__header'>

      <Avatar src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'/>
        
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon/>  
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>   
        </div>
  
      </div>

      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchIcon />
          <input placeholder='Search or start a new chat' type="text"/>
        </div>
      </div> 

      <div className='sidebar__chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  )
}

export default Sidebar