import ChatMessage from "src/components/atom/ChatMessage";

const MessageList = ({ messages, ...rest }) => {
  return (
    <ul {...rest}>
      {messages.map((message, key) => (
        <ChatMessage
          key={key}
          sender={message.sender}
          message={message.message}
        />
      ))}
    </ul>
  );
};

export default MessageList;
