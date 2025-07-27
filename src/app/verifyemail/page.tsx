"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-around h-100 w-85 border rounded-2xl py-2">
        <h1 className="text-3xl">Verify Email</h1>
        <h2 className="max-w-3/4 rounded p-2 bg-orange-500 text-black">
          {token ? `${token}` : "no token"}
        </h2>

        {verified ? (
          <div className="flex flex-col items-center">
            <h2 className=" text-green-500 text-2xl">Email Verified</h2>

            <div className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                <Link href="/login">Login</Link>
              </span>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl">Processing...</h2>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 text-black">
              Error Invalid Token
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
