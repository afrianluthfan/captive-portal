// app/captive-portal/page.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const CaptivePortal: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [hideMessage, setHideMessage] = useState<boolean>(false);

  useEffect(() => {
    if (fadeOut) {
      // Set a timeout to hide the message after the fade-out animation
      const timer = setTimeout(() => {
        setHideMessage(true);
      }, 2000); // Match the duration of the fade-out animation

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [fadeOut]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFadeOut(false); // Reset fade-out state before submitting
    setHideMessage(false); // Ensure the message is visible

    try {
      const response = await axios.post("/auth", {
        username,
        password,
      });

      if (response.data.success) {
        window.location.href = "https://www.google.com"; // Redirect to Google after successful authentication
      } else {
        setErrorMessage("Username or password is incorrect"); // Set error message
        setUsername(""); // Clear username field
        setPassword(""); // Clear password field

        // Wait 3 seconds before starting to fade out
        setTimeout(() => setFadeOut(true), 3000);
      }
    } catch (error) {
      console.error("Error during authentication", error);
      setErrorMessage("An error occurred during authentication"); // Set error message

      // Wait 3 seconds before starting to fade out
      setTimeout(() => setFadeOut(true), 3000);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="font-bold text-4xl mb-8">Captive Portal</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black"
            />
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black"
            />
          </div>
          {!hideMessage && errorMessage && (
            <p className={`text-red-500 mt-4 ${fadeOut ? "fade-out" : ""}`}>
              {errorMessage}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="bg-white rounded-md text-black px-4 mt-8"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptivePortal;
