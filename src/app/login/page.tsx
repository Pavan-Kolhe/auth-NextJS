"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile"); // check this
    } catch (error: any) {
      // Check if error is from server response
      if (error.response) {
        // Server responded with a status outside 2xx
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Login failed. Please try again.";
        toast.error(message);
        console.error("Login failed:", error.response);
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

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-center border rounded-2xl h-90 w-80 ">
        <h1 className=" bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent font-bold text-2xl mb-3">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr />

        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          disabled={buttonDisabled}
          onClick={onLogin}
          className=" mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            {buttonDisabled ? "No Login" : "Login"}
          </span>
        </button>
        <div className="text-blue-500">
          <Link href={"/forgot-password"}>Forgot Password ?</Link>
        </div>
        <Link href="/signup">Visit Signup page</Link>
      </div>
    </div>
  );
}
