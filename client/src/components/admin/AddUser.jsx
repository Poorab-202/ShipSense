import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function AddUserPage({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        warehouseId: ""
    });

    const [warehouses, setWarehouses] = useState([{ name: "Delhi" }, { name: "Mumbai" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                // const res = await axios.get("/api/warehouse/all");
                // setWarehouses(res.data);
            } catch (err) {
                console.error("Error fetching warehouses", err);
            }
        };
        fetchWarehouses();
    }, []);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post("/api/users/add", formData);

            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center w-252">
            <Card className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#3B0270]">Add New User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                placeholder="Set initial password"
                                required
                            />
                        </div>

                        <div>
                            <Label>Role</Label>
                            <Select value={formData.role} onValueChange={(v) => handleChange("role", v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Manager">Manager</SelectItem>
                                    <SelectItem value="Staff">Warehouse Staff</SelectItem>
                                    <SelectItem value="Customer">Customer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(formData.role === "Manager" || formData.role === "Staff") && (
                            <div>
                                <Label>Assign Warehouse</Label>
                                <Select value={formData.warehouseId} onValueChange={(v) => handleChange("warehouseId", v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Warehouse" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {warehouses.map((wh) => (
                                            <SelectItem key={wh._id} value={wh._id}>
                                                {wh.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" onClick={onClose} type="button">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-[#6F00FF] hover:bg-[#3B0270] text-white"
                            >
                                {loading ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}