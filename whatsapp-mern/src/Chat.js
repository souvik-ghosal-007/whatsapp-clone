import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import './Chat.css'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';


function Chat({messages}) {
  return (
    <div className='chat'>

      <div className='chat__header'>

        <Avatar />

        <div className='chat__headerInfo'>
          <h3>Souvik Ghosal</h3>
          <p>Last Seen at...</p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchIcon/>
          </IconButton>

          <IconButton>
            <AttachFileIcon/>
          </IconButton>

          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>

      </div>

      <div className="chat__body">
        {messages.map((message) => (
            <p className={`chat__message ${message.received && "chat__receiver"}`}>
            
            <span className="chat__name">{message.name}</span>
              
              {message.message}
           
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">

        <InsertEmoticonIcon />
        
        <form>
          <input placeholder="Type a message..." type="text" />
          
          <button  type="submit">
            Send a Message
          </button>

          <MicIcon />
        
        </form>
      
      </div>
    </div>
  )
}

export default Chat