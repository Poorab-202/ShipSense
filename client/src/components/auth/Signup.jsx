import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input  } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/config/api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData);

      if (response.data.success) {
        toast.success("Signup successful! Please login.");
        navigate("/"); 
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFF1F1]">
      {/* Left banner section (hidden on small screens) */}
      <div className="hidden md:flex flex-col justify-between bg-[#3B0270] text-white w-1/2 p-6 relative">
        <div className="absolute top-4 left-6">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
        <div className="flex items-center justify-center h-full">
          <img
            src="/login-banner.jpg"
            alt="Logistics"
            className="max-h-[400px] object-contain rounded-2xl"
          />
        </div>
        <div className="text-center pb-6">
          <h2 className="text-lg font-semibold">ShipSense</h2>
        </div>
      </div>

      {/* Signup form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-4">
        <Card className="w-full max-w-md shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#3B0270] text-center text-2xl font-bold">
              Create an Account
            </CardTitle>
            <p className="text-gray-500 text-center text-sm mt-1">
              Sign up to manage your logistics
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input className="my-1"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input className="my-1"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input className="my-1"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input className="my-1"
                  id="contactNumber"
                  type="text"
                  placeholder="Enter your contact number"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange("contactNumber", e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#6F00FF] hover:bg-[#3B0270] cursor-pointer"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>

              <div className="flex justify-between text-sm mt-2">
                <p>
                  Already have an account?
                  <Link
                    to="/"
                    className="text-[#6F00FF] hover:underline ml-1"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
