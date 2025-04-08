"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log(error);
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgot-password-mail", { email: forgotEmail });
      toast.success(response.data.message);
      setShowForgotPassword(false);
      setForgotEmail("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className='flex flex-col gap-4'>
        <label htmlFor="email">Email</label>
        <input 
          value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })} 
          type="email" 
          placeholder="Email" 
          className='border-2 border-gray-300 rounded-md p-2' 
        />
        <label htmlFor="password">Password</label>
        <input 
          value={user.password} 
          onChange={(e) => setUser({ ...user, password: e.target.value })} 
          type="password" 
          placeholder="Password" 
          className='border-2 border-gray-300 rounded-md p-2' 
        />
        <button 
          className='bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer' 
          type="submit"
        >
          Login
        </button>
        <button 
          type="button"
          className="text-blue-500 hover:underline"
          onClick={() => setShowForgotPassword(true)}
        >
          Forgot Password?
        </button>
        <Link href="/signup">Don&apos;t have an account? Sign up</Link>
      </form>

      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4 text-black text-center">Forgot Password</h2>
            <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-2 border-gray-300 rounded-md p-2 text-black"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer flex-1"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md hover:cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
