const ImageTextButton = ({ src, alt, name }) => {
  return (
    <button className="flex justify-center items-center gap-1 px-2 py-2 border bg-transparent border-gray-600 border-opacity-60 gray-100 rounded-full hover:bg-slate-100 hover:bg-opacity-10">
      <img src={src} alt={alt} width="18" height="18" />
      <p className="text-xs font-bold text-text-primary hidden xs:block">
        {name}
      </p>
    </button>
  );
};

export default ImageTextButton;
