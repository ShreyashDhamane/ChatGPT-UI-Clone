import {
  attachment,
  bulb,
  bulbYellow,
  codeEditor,
  copy,
  document,
  eye,
  webSearch,
} from "../../assets/icons"; // Importing images for buttons
import ImageTextButton from "../atoms/Button/ImageTextButton";
import MainButton from "../atoms/Button/MainButton";
import SuggestionButton from "../atoms/Button/SuggestionButton";
import MainInput from "../atoms/Input/MainInput";
import { loremIpsum } from "lorem-ipsum";

const Body = ({
  query = "",
  setQuery, // Function to update the query state from the parent component
  hasUserInteracted,
  setHasUserInteracted, // Function to update the user interaction state from the parent component
  messages,
  setMessages, // Function to update messages state (if needed in the future)
}) => {
  const handleOnMessageSend = async () => {
    if (!query.trim()) return; // Prevent sending empty messages
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    // Add user message
    const userMessage = { content: query, isSenderUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    // Generate response
    const assistantResponse = loremIpsum({
      count: 1,
      units: "paragraphs",
      sentenceLowerBound: 5,
      sentenceUpperBound: 15,
      paragraphLowerBound: 3,
      paragraphUpperBound: 7,
    });

    // Add placeholder
    setMessages((prev) => [
      ...prev,
      {
        content: "",
        isSenderUser: false,
        isStreaming: true,
      },
    ]);

    // Stream response
    for (let i = 0; i <= assistantResponse.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          content: assistantResponse.substring(0, i),
          isStreaming: i < assistantResponse.length,
        };
        return newMessages;
      });
    }
  };

  return (
    <section className="flex-1 flex flex-col justify-center items-center w-full px-4">
      {!hasUserInteracted && (
        <div className="flex-1 flex flex-col justify-end items-center z-0">
          <h1 className="text-white text-3xl font-semibold text-center pb-5 leading-none">
            What can I help with?
          </h1>
        </div>
      )}
      <div
        className={`flex-1 w-full max-w-[768px] flex flex-col-reverse xs:flex-col justify-between ${
          hasUserInteracted ? "xs:justify-end" : "xs:justify-start "
        } `}
      >
        {hasUserInteracted && (
          <div className="flex flex-col h-full flex-1 mt-0 px-6 fixed top-12 max-h-[75%] overflow-y-auto w-full">
            {messages.map((message) => {
              const handleCopy = () => {
                navigator.clipboard
                  .writeText(message.content)
                  .then(() => {
                    // Optional: Show a "Copied!" feedback
                    console.log("Text copied to clipboard");
                  })
                  .catch((err) => {
                    console.error("Failed to copy text: ", err);
                  });
              };

              return (
                <div className="w-full flex flex-col">
                  {message.isSenderUser ? (
                    <div className="flex flex-col justify-center items-end group">
                      <div className="max-w-[75%]">
                        <p className="px-5 py-2 bg-bg-tertiary rounded-3xl mt-3 mb-2 text-white">
                          {message.content}
                        </p>
                      </div>
                      <button
                        className="hover:cursor-pointer p-2 opacity-0 hover:bg-bg-tertiary rounded-lg group-hover:opacity-100 transition-all duration-500 ease-in-out"
                        onClick={handleCopy}
                      >
                        <img src={copy} alt="copy" height={18} width={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-start group">
                      <div className="max-w-[75%]">
                        <p className="px-5 py-0 mt-0 mb-2 text-white">
                          {message.content}
                        </p>
                      </div>
                      <button
                        className="hover:cursor-pointer ml-3 p-2  hover:bg-bg-tertiary rounded-lg"
                        onClick={handleCopy}
                      >
                        <img src={copy} alt="copy" height={18} width={18} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="w-full flex flex-col md:w-[768px] bg-bg-tertiary px-0 py-3 rounded-4xl mt-0 hover:cursor-text">
          <MainInput
            query={query} // Pass the query to MainInput to control its value
            setQuery={setQuery} // Pass the setQuery function to update the query state
            handleSubmit={handleOnMessageSend}
          />
          <div className="flex justify-between w-full pl-4 pr-3">
            <div className="flex gap-2">
              <ImageTextButton
                src={attachment}
                alt="attachment"
                name="Attach"
              />
              <ImageTextButton src={webSearch} alt="web" name="Search" />
              <ImageTextButton src={bulb} alt="bulb" name="Reason" />
            </div>
            <MainButton
              query={query} // Pass the query to MainButton to control its visibility
              onClick={handleOnMessageSend}
            />
          </div>
        </div>
        {!hasUserInteracted && (
          <div className="max-xs:flex-1 max-xs:flex max-xs:flex-col max-xs:w-full max-xs:justify-start max-xs:items-center">
            <div className="flex gap-2 mt-6 flex-wrap justify-center item">
              <SuggestionButton
                src={codeEditor}
                alt="code editor"
                name="Code"
              />
              <SuggestionButton
                src={bulbYellow}
                alt="brainstorm"
                name="Brainstorm"
              />
              <SuggestionButton
                src={document}
                alt="doc"
                name="Summarize text"
              />
              <SuggestionButton src={eye} alt="eye" name="Analyze images" />
              <div>
                <SuggestionButton src={null} alt="null" name="More" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Body;
