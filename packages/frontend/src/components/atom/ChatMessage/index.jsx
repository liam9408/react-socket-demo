const ChatMessage = ({ sender, message, ...rest }) => {
  return (
    <li {...rest}>
      {sender} : {message}
    </li>
  );
};

export default ChatMessage;
