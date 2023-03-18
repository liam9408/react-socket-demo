import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import ChatLayout from "src/components/templates/ChatLayout";
import Label from "src/components/atom/Label";
import Input from "src/components/atom/Input";
import Button from "src/components/atom/Button";
import Text from "src/components/atom/Text";
import MessageList from "src/components/molecules/MessageList";
import MessageForm from "src/components/molecules/MessageForm";

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});

  useEffect(() => {
    const newSocket = io("http://localhost:<BACKEND_PORT>");
    setSocket(newSocket);

    newSocket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: data[1], message: data[0] },
      ]);
    });

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

  const joinChatRoom = () => {
    const room = prompt("Which room would you like to join?");

    if (currentRoom !== {}) {
      socket.emit("unsubscribe", currentRoom.name);
    }
    socket.emit("subscribe", room);
  };

  return (
    //   chat room
    <ChatLayout>
      {/* Username form */}
      <div>
        <Label htmlFor="username" text="Username:" />
        <Input
          type="text"
          id="username"
          value={""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* join room button */}
      <div>
        <Button
          id="join"
          onClick={() => joinChatRoom("clicked join chat room")}
          text="Join chat room"
        ></Button>
      </div>

      {/* room number display */}
      <Text id="room" text={`You are in Room: ${""}`} />

      {/* message list */}
      <MessageList id="messages" messages={messages} />

      {/* message form */}
      <MessageForm
        id="msg"
        onSubmit={handleSendMessage}
        inputValue={""}
        handleInputChange={(e) => setMessage(e.target.value)}
      />
    </ChatLayout>
  );
};

export default ChatPage;
