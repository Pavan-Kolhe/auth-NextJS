"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      const userId = response.data.data._id;
      setData(userId);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>

      <h2 className="mt-4 border-dashed border-1 p-3 text-xl rounded-2xl">
        {data === "nothing" ? (
          "click on get user profile button"
        ) : (
          <Link href={`/profile/${data}`}>
            click to go to profie of :{data}
          </Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className=" bg-blue-700 mt-4 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className=" bg-red-700 mt-4 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
      >
        Get User Profile
      </button>
    </div>
  );
}
