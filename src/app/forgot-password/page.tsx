'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Clear any previous errors
        setError("");

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgot-password", { token, password });
            toast.success(response.data.message);
            // Redirect to login page after successful reset
            router.push("/login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                toast.error(error.message);
            } else {
                setError("An unknown error occurred");
                toast.error("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Reset Password</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex flex-col gap-4 mt-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password"
                        className="border-2 border-gray-300 rounded-md p-2"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password" 
                        className="border-2 border-gray-300 rounded-md p-2"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                    <Link href="/login" className="text-blue-500 hover:underline text-center">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

