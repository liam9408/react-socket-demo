const Text = ({ text, ...rest }) => {
  return <div {...rest}>{text}</div>;
};

export default Text;
