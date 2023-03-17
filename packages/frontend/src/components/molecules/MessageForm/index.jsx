import Input from "src/components/atom/Input";
import Button from "src/components/atom/Button";

const MessageForm = ({
  handleSubmit,
  handleInputChange,
  inputValue,
  ...rest
}) => {
  return (
    <form {...rest} onSubmit={handleSubmit}>
      <Input
        id="messageInput"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button text="Send" />
    </form>
  );
};

export default MessageForm;
