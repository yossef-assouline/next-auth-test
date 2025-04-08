"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {  useState } from "react";
import Link from "next/link";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
   try {
    const response = await axios.get("/api/users/logout");
    console.log(response);
    router.push("/login");
    toast.success("Logout successful");
   } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred");
    }
   }
  }
  const handleGetUser = async () => {
    const response = await axios.get("/api/users/get-user");
    setUser(response.data.user);
  }
 
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <button onClick={handleLogout} className='bg-red-700 text-white p-2 rounded-md hover:cursor-pointer' >Logout</button>
      <button onClick={handleGetUser} className='bg-blue-700 text-white p-2 rounded-md hover:cursor-pointer' >Get User</button>
      {user && (
        <div>
          <h2>User Details</h2>
          <p>Name: {user?.username}</p>
          <p>Email: {user?.email}</p>
          <Link href={`profile/${user._id}`}>{user._id}</Link>
        </div>
      )}
    </div>
  );
}
