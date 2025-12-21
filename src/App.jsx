import './App.css'

import { Header } from "./components/header/Header.jsx";
import { ChatWindow } from './components/chatwindow/ChatWindow.jsx';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage.jsx';

function App() 
{

    const [isOpen, setIsOpen] = useState(false);
    // isOpen is managing sidebar, as well as the scaling of chat window

    const [messages, setMessages] = useState(() =>
    {
      const userMessages = localStorage.getItem("userMessages");
      return (userMessages) ? JSON.parse(userMessages) : [];
    });

  return (
    <Routes>
        <Route path="/" element={
          <>
            <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
            <ChatWindow isOpen={isOpen} messages={messages} setMessages={setMessages}/>
          </>
        } />
        <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
