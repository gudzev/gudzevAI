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

  const [chats, setChats] = useState(() =>
  {
    const storedChats = JSON.parse(localStorage.getItem("userChats"));

    return (storedChats) ? storedChats : [
    {
      ID: crypto.randomUUID(),
      messages: [],
      name: "Chat 1",
    }]
  });

  const [chatCounter, setChatCounter] = useState(chats.length + 1);

  const [activeChatID, setActiveChatID] = useState(chats.length > 0 ? chats[0].ID : "");

  return (
    <Routes>
        <Route path="/" element={
          <>
            <Header isOpen={isOpen} setIsOpen={setIsOpen} chats={chats} setChats={setChats} chatCounter={chatCounter} setChatCounter={setChatCounter} setActiveChatID={setActiveChatID} activeChatID={activeChatID}/>
            <ChatWindow isOpen={isOpen} chats={chats} setChats={setChats} setChatCounter={setChatCounter} chatCounter={chatCounter} activeChatID={activeChatID}/>
          </>
        } />
        <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
