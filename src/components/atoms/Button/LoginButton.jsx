const AuthButton = ({
  onClick = () => {},
  label,
  textColor = "text-black",
  borderWidth = "",
  borderColor = "",
  bgColor = "",
  onHoverStyle = "",
  padding = "px-4 py-2",
  additionalStyles = "",
}) => {
  return (
    <button
      className={`flex justify-center items-center ${padding} font-semibold text-sm ${textColor} ${bgColor} rounded-full navbar-button-container ${borderWidth} ${borderColor} ${bgColor} ${onHoverStyle} ${additionalStyles}`}
      onClick={onClick}
    >
      <p>{label}</p>
    </button>
  );
};

export default AuthButton;
