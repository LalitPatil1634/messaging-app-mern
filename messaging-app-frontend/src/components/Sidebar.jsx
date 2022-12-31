import React from 'react';
import './Sidebar.css';
// import './Searchbar.css';
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import { SidebarChat } from './SidebarChat';
import { useStateValue } from './StateProvider';

export const Sidebar = ({ messages }) => {

    const [{ user }, dispatch] = useStateValue();


    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder='Search or start new chat' />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat messages={messages} />
            </div>
        </div>
    )
}

