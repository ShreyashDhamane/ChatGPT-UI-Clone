import { useEffect, useRef, useState } from "react";

const MainInput = ({
  query = "", // Default value for the query prop
  setQuery, // Function to update the query state from the parent component
  handleSubmit = () => {}, // Default function for handling submit action
}) => {
  const textareaRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(24); // Default fallback

  // Handle key down events
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.ctrlKey) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };
  // Calculate the actual line height
  useEffect(() => {
    if (textareaRef.current) {
      // Temporarily set height to auto and add a single character
      textareaRef.current.value = "x";
      const initialHeight = textareaRef.current.scrollHeight;

      // Add a new line and measure again
      textareaRef.current.value = "x\n";
      const twoLineHeight = textareaRef.current.scrollHeight;

      // Calculate actual line height
      const calculatedLineHeight = twoLineHeight - initialHeight;
      setLineHeight(calculatedLineHeight || 24); // Fallback to 24px if calculation fails

      // Reset the value
      textareaRef.current.value = "";
    }
  }, []);

  // Adjust height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = lineHeight * 7;
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > maxHeight ? "scroll" : "hidden";
    }
  }, [query, lineHeight]);

  return (
    <textarea
      id="main-input"
      ref={textareaRef}
      value={query}
      placeholder="Ask anything"
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      style={{
        minHeight: `${lineHeight}px`,
      }}
      className="
            outline-none
            bg-transparent
            text-text-link 
            font-normal 
            text-md 
            tracking-wide 
            w-full 
            resize-none 
            pl-7
            pr-7
            m-0
            border-none
            transition-all duration-100 ease-in-out
            mb-5
            "
      rows={1}
    />
  );
};

export default MainInput;
