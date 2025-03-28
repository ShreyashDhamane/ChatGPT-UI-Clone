import Navbar from "./components/organisms/Navbar";
import { useEffect, useState } from "react";
import Footer from "./components/organisms/Footer";
import Body from "./components/organisms/Body";
import AuthButton from "./components/atoms/Button/LoginButton";
function App() {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTemporaryModeOn, setIsTemporaryModeOn] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // State to track if input is given
  const [messages, setMessages] = useState([]); // State to store messages (if needed in the future)
  const [showUserLoginPopup, setShowUserLoginPopup] = useState(false); // State to control the visibility of the login popup

  //if user is not logged in then after 1 sec, show the login popup in use effect

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowUserLoginPopup(true);
      }, 1000); // Show popup after 1 second

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
    // Cleanup function to hide the popup when user logs in
  }, []);

  return (
    <main className="h-screen max-h-screen w-screen max-w-screen bg-bg-primary flex flex-col items-center">
      {showUserLoginPopup && !isLoggedIn && (
        <div
          className={`w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-50 z-30 flex justify-center items-end xs:items-center`}
        >
          <div className="bg-bg-tertiary px-8 py-8 rounded-2xl max-w-sm flex flex-col">
            <h1 className="text-white font-semibold text-2xl text-center">
              Welcome back
            </h1>
            <p className="text-white text-lg text-center">
              Log in or sign up to get smarter responses, upload files and
              images, and more.
            </p>
            <div className="h-6" />
            <AuthButton
              onClick={() => {
                setIsLoggedIn(true); // Simulate sign up action
                setShowUserLoginPopup(false); // Close the popup after sign up
              }}
              label={"Log in"}
              bgColor={"bg-white"}
              onHoverStyle={"hover:bg-opacity-90"}
              padding={"py-6"}
            />
            <div className="h-3" />
            <AuthButton
              onClick={() => {
                setIsLoggedIn(true); // Simulate sign up action
                setShowUserLoginPopup(false); // Close the popup after sign up
              }}
              label={"Sign up"}
              textColor={"text-white"}
              borderWidth={"border"}
              borderColor={"border-gray-600"}
              onHoverStyle={"hover:bg-opacity-10"}
              padding={"py-6"}
            />
            <div className="h-3" />
            <AuthButton
              onClick={() => setShowUserLoginPopup(false)} // Close the popup without logging in
              label={"Stay logged out"}
              textColor={"text-text-link"}
              padding={"py-6"}
              onHoverStyle={"hover:bg-opacity-0"}
              additionalStyles={"underline"}
            />
          </div>
        </div>
      )}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isTemporaryModeOn={isTemporaryModeOn}
        setIsTemporaryModeOn={setIsTemporaryModeOn}
        setMessages={() => {
          setMessages([]); // Clear messages when new chat is clicked (if needed)
          setHasUserInteracted(false); // Reset user interaction state
        }} // Pass down the messages state setter
      />
      <Body
        query={query}
        setQuery={setQuery}
        hasUserInteracted={hasUserInteracted}
        setHasUserInteracted={setHasUserInteracted}
        messages={messages}
        setMessages={setMessages} // Pass down the messages state and setter
      />
      <Footer hasUserInteracted={hasUserInteracted} />
    </main>
  );
}

export default App;
