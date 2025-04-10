"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: unknown) {
            setError(true);
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    useEffect(() => {  
            verifyUserEmail();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Verify Email</h1>
            <h2 className="text-2xl font-bold">{token ? `${token}` : "no token found"}</h2>
            {verified ? (
                <div>
                    <h2>Email verified successfully</h2>
                    <Link href="/login">Login</Link>
                </div>
            ) : (
                <div>
                    <h2>Email not verified</h2>
                    <p>{error ? error : "Something went wrong"}</p>
                </div>
            )}
        </div>
    );
}