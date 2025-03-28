import { useEffect, useRef, useState } from "react";
import {
  sidebarSm,
  sidebar,
  newChat,
  dropdown,
  temporaryOff,
  temporaryOn,
} from "../../assets/icons";
import { noAuthUpSell, userImage } from "../../assets/images";
import AuthButton from "../atoms/Button/LoginButton";
import SuggestionButton from "../atoms/Button/SuggestionButton";
import Icon from "../atoms/icon/Icon";
import ResponsiveIcon from "../atoms/Icon/ResponsiveIcon/ResponsiveIcon";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  isTemporaryModeOn,
  setIsTemporaryModeOn,
  setMessages, // Pass down the messages state setter (if needed in the future)
}) => {
  const [isOnClickChatGPTPopVisible, setIsOnClickChatGPTPopVisible] =
    useState(false);
  const onClickChatGPTPopRef = useRef(null);
  const excludedRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is inside the popup or the excluded element
      if (
        onClickChatGPTPopRef.current &&
        !onClickChatGPTPopRef.current.contains(event.target) &&
        excludedRef.current &&
        !excludedRef.current.contains(event.target)
      ) {
        setIsOnClickChatGPTPopVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="px-3 py-2 text-text-primary flex items-center w-full fixed top-0 left-0 bg-bg-primary z-10">
      <div className="flex justify-center items-center">
        {isLoggedIn && (
          <ResponsiveIcon icon={sidebar} iconSm={sidebarSm} alt={"sidebar"} />
        )}
        <Icon
          src={newChat}
          alt={"new chat"}
          onClick={() => {
            setMessages([]); // Clear messages when new chat is clicked (if needed)
          }}
        />
      </div>
      <div className="flex-1">
        <div className="flex-1 flex items-center justify-center md:justify-start relative">
          <button
            className="flex justify-center items-center gap-1 navbar-button-container px-3 py-2 "
            onClick={() => {
              setIsOnClickChatGPTPopVisible(!isOnClickChatGPTPopVisible);
            }}
            ref={excludedRef}
          >
            <h3 className="text-lg text-text-primary font-semibold ">
              ChatGPT
            </h3>
            <img src={dropdown} alt="dropdown" width={18} height={18} />
          </button>
          {!isLoggedIn && isOnClickChatGPTPopVisible && (
            <div
              className="absolute top-12 z-10 w-screen max-w-[350px] max-h-screen overflow-auto rounded-2xl border border-gray-600 border-opacity-80"
              ref={onClickChatGPTPopRef}
            >
              <img
                src={noAuthUpSell}
                className="rounded-t-2xl h-32 w-full max-w-[350px]"
              />
              <div className="bg-bg-popup px-5 py-5 rounded-b-2xl">
                <h3 className="text-white text-lg font-medium">
                  Try advanced features for free
                </h3>
                <p className="text-sm text-text-link font-normal mt-1">
                  Get smarter responses, upload files, create images, and more
                  by logging in.
                </p>
                <div className="flex gap-2 mt-5 mb-1">
                  <AuthButton
                    onClick={() => setIsLoggedIn(true)}
                    label={"Log in"}
                    bgColor={"bg-white"}
                    onHoverStyle={"hover:bg-opacity-90"}
                    padding={"px-4 py-[6px] md:py-2"}
                  />
                  <AuthButton
                    onClick={() => setIsLoggedIn(true)}
                    label={"Sign up"}
                    textColor={"text-white"}
                    borderWidth={"border"}
                    borderColor={"border-gray-600"}
                    onHoverStyle={"hover:bg-opacity-10"}
                    padding={"px-4 py-[6px] md:py-2"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isLoggedIn ? (
        <div className="flex gap-2">
          <AuthButton
            onClick={() => setIsLoggedIn(true)}
            label={"Log in"}
            bgColor={"bg-white"}
            onHoverStyle={"hover:bg-opacity-90"}
            padding={"px-4 py-[6px] md:py-2"}
          />
          <div className="hidden md:block">
            <AuthButton
              onClick={() => setIsLoggedIn(true)}
              label={"Sign up"}
              textColor={"text-white"}
              borderWidth={"border"}
              borderColor={"border-gray-600"}
              onHoverStyle={"hover:bg-opacity-10"}
              padding={"px-4 py-[6px] md:py-2"}
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-end">
          {!isTemporaryModeOn ? (
            <SuggestionButton
              src={temporaryOff} // Placeholder for user profile icon
              alt="temporary"
              name="Temporary"
              width={16}
              height={16}
              onClick={() => setIsTemporaryModeOn(true)}
              fontBold={"font-medium"}
              textSize={"text-sm"}
              textColor={"text-white"}
            />
          ) : (
            <SuggestionButton
              src={temporaryOn} // Placeholder for user profile icon
              alt="temporary"
              name="Temporary"
              width={16}
              height={16}
              onClick={() => setIsTemporaryModeOn(false)}
              fontBold={"font-medium"}
              textSize={"text-sm"}
              textColor={"text-white"}
            />
          )}
          <button>
            <img
              src={userImage}
              alt="user"
              width={32}
              height={32}
              className="rounded-full border border-gray-700 hover:border-gray-500 hover:cursor-pointer"
            />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
