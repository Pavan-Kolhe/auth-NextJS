"use client"; // to say this is a frontend page and also unlocks some features
import Link from "next/link";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
// React Hot Toast is only for frontend (client-side) use in Next.js.
//Toasts are UI notifications meant to be shown to the user in the browser.
//They must run in a 'use client' component.

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user); // aage ka route and data
      console.log("Signup success", response.data);
      toast.success("Signup success");
      router.push("/login"); // check this
    } catch (error) {
      // Check if error is from server response
      if (error.response) {
        // Server responded with a status outside 2xx
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Signup failed. Please try again.";
        toast.error(message);
        console.error("Signup failed:", error.response);
      } else if (error.request) {
        // Request was made but no response
        toast.error("No response from server. Check your connection.");
        console.error("No response:", error.request);
      } else {
        // Something else happened
        toast.error("An unexpected error occurred.");
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-center h-100 w-80 py-6 border rounded-2xl ">
        <h1 className="bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent font-bold text-2xl m-3">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr />
        <label htmlFor="username">username</label>
        {/* This makes the input controlled — its value is determined by React state
      (user.username). Whatever is stored in user.username will be shown in the
      input box. When the user types something, onChange updates the state
      (setUser(...)), which updates the value again — creating a loop to keep
      the input and state in sync. */}
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          disabled={buttonDisabled}
          onClick={onSignup}
          className=" cursor-pointer p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No signup" : "Signup here"}
        </button>
        <Link href="/login">Visit login page</Link>
      </div>
    </div>
  );
}
