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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Password</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified ? (
        <div>
          <h2 className="text-2xl">Password changed successfully</h2>
          <Link href="/login">Login</Link>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl">Enter new Password</h2>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={verifyUserPassword}
          >
            change password
          </button>
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
  );
}
