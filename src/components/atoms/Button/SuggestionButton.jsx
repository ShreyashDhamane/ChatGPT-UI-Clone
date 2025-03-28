const SuggestionButton = ({
  src,
  alt,
  name,
  width = 18,
  height = 18,
  onClick = () => {},
  fontBold = "font-normal",
  textSize = "text-xs",
  textColor = "text-text-primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-1 ${
        src ? "px-2" : "px-3"
      } py-2 border bg-transparent border-slate-600 gray-100 rounded-full md:p-3 border-opacity-85 hover:bg-slate-100 hover:bg-opacity-10 group`}
    >
      {src && <img src={src} alt={alt} width={width} height={height} />}
      <p
        className={`${textSize} ${textColor} text-nowrap group-hover:text-white ${fontBold}`}
      >
        {name}
      </p>
    </button>
  );
};

export default SuggestionButton;
