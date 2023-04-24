import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});

  useEffect(() => {
    const newSocket = io("https://be-sockets-liam-21-apr.fly.dev");
    setSocket(newSocket);

    // 3
    newSocket.on("chatMessage", (data) => {
      console.log(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: data[1], message: data[0] },
      ]);
    });

    // 4
    newSocket.on("joinRoom", (data) => {
      const { room, messages } = data;
      setCurrentRoom(room);
      setMessages(
        messages.map((message) => ({
          sender: message.sender,
          message: message.message,
        }))
      );
    });

    return () => newSocket.close();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!socket) return;

    socket.emit("chatMessage", [message, username, currentRoom]);
    setMessage("");
  };

  // 1
  const joinChatRoom = () => {
    const room = prompt("Which room would you like to join?");

    if (currentRoom !== {}) {
      socket.emit("unsubscribe", currentRoom.name);
    }
    socket.emit("subscribe", room);
  };

  return (
    <div className="App">
      {/* username input */}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* join chat room button */}
      <div>
        <button id="join" onClick={joinChatRoom}>
          Join Chat Room
        </button>
      </div>

      {/* chat room display */}
      <div id="room">You are in Room: {currentRoom.name}</div>

      {/* messages list */}
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.sender} : {msg.message}
          </li>
        ))}
      </ul>

      {/* enter message form */}
      <form id="msg" onSubmit={handleSendMessage}>
        <input
          id="m"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
