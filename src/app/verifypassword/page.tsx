"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyPasswordPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const verifyUserPassword = async () => {
    try {
      await axios.post("/api/users/verifypassword", { token, newPassword });
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

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className="border flex flex-col items-center justify-center rounded-2xl h-110 w-95 py-2">
        <h1 className="mb-10 text-3xl">Verify Password</h1>
        <h2 className="max-w-3/4 mb-10 p-2 rounded bg-orange-500 text-black">
          {token ? `${token}` : "no token"}
        </h2>

        {verified ? (
          <div>
            <h2 className="mb-7 bg-gray-900 text-xl">
              Password changed successfully !
            </h2>
            <div className="flex justify-center">
              <Link
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                href="/login"
              >
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <label className="mb-2 text-xl" htmlFor="password">
              Enter new Password
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
              placeholder="new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="cursor-pointer hover:bg-gray-700 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              onClick={verifyUserPassword}
            >
              change password
            </button>
          </div>
        )}
        {error && (
          <div>
            <h2 className="p-2 text-2xl rounded-2xl border border-dashed text-red-500">
              Error Invalid Token
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
