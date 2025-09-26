import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function AddWarehouse({ onClose, onSuccess }) {
    // formData sample
    const [formData, setFormData] = useState({
        name: "Delhi Central Warehouse",
        location: "Delhi",
        capacity: "1000",
        managerId: "m001"
    });

    // managers list sample
    const [managers, setManagers] = useState([
        {
            _id: "m001",
            name: "Rajesh Sharma",
            contact: "+91-9876543210",
            email: "rajesh.sharma@example.com"
        },
        {
            _id: "m002",
            name: "Priya Verma",
            contact: "+91-9123456789",
            email: "priya.verma@example.com"
        },
        {
            _id: "m003",
            name: "Amit Singh",
            contact: "+91-9988776655",
            email: "amit.singh@example.com"
        }
    ]);

    // selected manager example (linked to managerId = "m001")
    const [selectedManager, setSelectedManager] = useState({
        _id: "m001",
        name: "Rajesh Sharma",
        contact: "+91-9876543210",
        email: "rajesh.sharma@example.com"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchManagers = async () => {
            try {
                // const res = await axios.get("/api/managers");
                // setManagers(res.data);
            } catch (err) {
                console.error("Error fetching managers", err);
            }
        };
        fetchManagers();
    }, []);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleManagerSelect = (id) => {
        handleChange("managerId", id);
        const manager = managers.find((m) => m._id === id);
        setSelectedManager(manager);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post("/api/warehouse/add", {
                name: formData.name,
                location: formData.location,
                capacity: Number(formData.capacity),
                managerId: formData.managerId
            });

            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add warehouse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center w-252">
            <Card className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#3B0270]">Add Warehouse</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Enter warehouse name"
                                required
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                                placeholder="Enter warehouse location"
                                required
                            />
                        </div>

                        <div>
                            <Label>Capacity</Label>
                            <Input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => handleChange("capacity", e.target.value)}
                                placeholder="Enter total capacity"
                                required
                            />
                        </div>

                        <div>
                            <Label>Assign Manager</Label>
                            <Select value={formData.managerId} onValueChange={handleManagerSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Manager" />
                                </SelectTrigger>
                                <SelectContent>
                                    {managers.map((m) => (
                                        <SelectItem key={m._id} value={m._id}>
                                            {m.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedManager && (
                            <div className="bg-[#FFF1F1] p-3 rounded-lg">
                                <p><strong>Contact:</strong> {selectedManager.contact}</p>
                                <p><strong>Email:</strong> {selectedManager.email}</p>
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