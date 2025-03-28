const Icon = ({ src, alt, onClick = () => {} }) => {
  return (
    <button
      className="px-2 py-3 flex justify-center items-center navbar-button-container"
      onClick={onClick}
    >
      <img src={src} alt={alt} />
    </button>
  );
};

export default Icon;
