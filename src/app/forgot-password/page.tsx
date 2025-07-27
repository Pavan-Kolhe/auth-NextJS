"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      setIsEmailSent(true);
      toast.success("Check your email for password reset link");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Forgot Password</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      {isEmailSent ? (
        <div className="text-2xl text-green-400">
          Check your email for password reset link
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          change password
        </button>
      )}
    </div>
  );
}
