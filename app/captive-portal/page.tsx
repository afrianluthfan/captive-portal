"use client";

// app/captive-portal/page.tsx
import { useState } from "react";
import axios from "axios";

const CaptivePortal: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/authenticate", {
        username,
        password,
      });
      if (response.data.success) {
        window.location.href = "https://www.google.com"; // Redirect to Google after successful authentication
      } else {
        alert("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication", error);
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
