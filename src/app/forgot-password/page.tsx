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
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-center border rounded-2xl h-90 w-75">
        <h1 className="bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent font-bold text-2xl mb-6">
          Forgot Password
        </h1>
        <hr />
        <label htmlFor="email">Enter email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        {isEmailSent ? (
          <div className="text-center w-3/4 border-dashed border rounded-2xl p-2 mt-4 text-amber-400">
            Check your email <hr />
            for password reset link
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className=" mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              change password
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
