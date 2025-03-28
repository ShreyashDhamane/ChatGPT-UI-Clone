const Footer = ({
  hasUserInteracted, // This prop is not used in the current implementation but can be utilized for future enhancements
}) => {
  return (
    <footer className="flex justify-center items-center w-full">
      {hasUserInteracted ? (
        <p className="text-text-primary text-xs text-center p-2">
          ChatGPT can make mistakes. Check important info.
        </p>
      ) : (
        <p className="p-2 text-text-primary text-sm text-center">
          By messaging ChatGPT, you agree to our{" "}
          <span className="underline text-text-link">Terms</span> and have read
          our <span className="underline text-text-link">Privacy Policy</span>.
        </p>
      )}
      <button className="h-[24px] w-[24px] max-h-[24px] max-w-[24px] text-sm text-text-primary fixed bottom-2 right-2 p-2 border border-white rounded-full flex justify-center items-center">
        <p>?</p>
      </button>
    </footer>
  );
};

export default Footer;
