import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Chat } from './components/Chat';
import { Sidebar } from './components/Sidebar';
import Pusher from 'pusher-js'
import axios from 'axios'
import { Login } from './components/Login';
import { useStateValue } from './components/StateProvider';

function App() {

  const [messages, setMessages] = useState([])
  const [{ user }, setUser] = useStateValue();
  // const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    axios.get("/messages/sync").then(res => {
      setMessages(res.data);
    })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('7fcb95e8a5ab86c4f243', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  console.log(messages);


  return (
    <div className="App">
      {!user ? <Login /> : (
        <div className="App_body">
          <Sidebar messages={messages}/>
          <Chat messages={messages} />
        </div>
      )}
    </div>
  );
}

export default App;
