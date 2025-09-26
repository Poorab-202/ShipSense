import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });

            console.log("Login success:", response.data);
            // Save token / redirect after login
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden md:flex flex-col justify-between bg-gray-900 text-white w-1/2 p-6 relative">
                <div className="absolute top-4 left-6">
                    <img src="logo.jpg" alt="Logo" className="h-10" />
                </div>
                <div className="flex items-center justify-center h-full">
                    <img src="login-banner.jpg" alt="Logistics" className="max-h-[400px] object-contain rounded-2xl" />
                </div>
                <div className="text-center pb-6">
                    <h2 className="text-lg font-semibold">Campus Express</h2>
                </div>
            </div>

            <div className="flex items-center justify-center w-full md:w-1/2 p-4">
                <Card className="w-full max-w-md shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#3B0270] text-center text-2xl font-bold">
                            Welcome back!
                        </CardTitle>
                        <p className="text-[#3B0270] text-center text-sm mt-1">
                            Sign in to manage your logistics
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            <Button type="submit" className="w-full bg-[#6F00FF] hover:bg-[#3B0270] cursor-pointer" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>

                            <div className="flex justify-between text-sm mt-2">
                                <p>
                                    Don't have an account? 
                                    <a href="/signup" className="text-blue-600 hover:underline ml-1">
                                        Sign up
                                    </a>
                                </p>
                                <a href="/forgot-password" className="text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
