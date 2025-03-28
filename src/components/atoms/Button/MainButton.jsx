import { upArrow, voice } from "../../../assets/icons";

const MainButton = ({ query, onClick }) => {
  return (
    <div>
      <button
        className={`bg-white rounded-full py-2 px-3 max-h-[36px] gap-1 hover:bg-opacity-90 items-center ${
          query.length == 0 ? "flex" : "hidden"
        }`}
      >
        <img src={voice} alt="voice" />
        <p className="text-xs font-semibold text-black">Voice </p>
      </button>
      <button
        onClick={onClick}
        className={`bg-white rounded-full p-1 hover:bg-opacity-90 max-h-[36px] max-w-[36px] ${
          query.length == 0 ? "hidden" : "block"
        }`}
      >
        <img src={upArrow} alt="up arrow" />
      </button>
    </div>
  );
};

export default MainButton;
