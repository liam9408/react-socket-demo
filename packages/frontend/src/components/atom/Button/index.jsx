const Button = ({ onClick, text, ...rest }) => {
  return (
    <button {...rest} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
