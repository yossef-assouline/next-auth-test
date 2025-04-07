"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <form action="" onSubmit={handleSignup} className='flex flex-col gap-4'>
        <label htmlFor="username">Username</label>
        <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" placeholder="Username" className='border-2 border-gray-300 rounded-md p-2' />
        <label htmlFor="email">Email</label>
        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder="Email" className='border-2 border-gray-300 rounded-md p-2' />
        <label htmlFor="password">Password</label>
        <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" className='border-2 border-gray-300 rounded-md p-2' />
        <button className='bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer' type="submit">{buttonDisabled ? "No Signup" : "Signup"}</button>
        <Link href="/login">Already have an account? Login</Link>
      </form>
      
    </div>
  )
}
