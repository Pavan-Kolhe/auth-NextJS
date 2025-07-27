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
      <div className="flex flex-col items-center justify-center border rounded-2xl h-85 w-80 ">
        <h1 className=" font-bold text-2xl mb-3">
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
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>
        <div className="text-blue-600">
          <Link href={"/forgot-password"}>Forgot Password ?</Link>
        </div>
        <Link href="/signup">Visit Signup page</Link>
      </div>
    </div>
  );
}
