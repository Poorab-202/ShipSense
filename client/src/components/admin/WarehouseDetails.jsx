import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export default function WarehouseDetails() {
    // State initialization
    const [warehouses, setWarehouses] = useState([
        {
            _id: "wh001",
            name: "Delhi Central Warehouse",
            location: "Delhi",
            capacity: 1000,
            usedCapacity: 850
        },
        {
            _id: "wh002",
            name: "Mumbai Storage Hub",
            location: "Mumbai",
            capacity: 1500,
            usedCapacity: 600
        },
        {
            _id: "wh003",
            name: "Chennai Depot",
            location: "Chennai",
            capacity: 1200,
            usedCapacity: 1200
        },
        {
            _id: "wh004",
            name: "Bengaluru Logistics Center",
            location: "Bengaluru",
            capacity: 800,
            usedCapacity: 500
        }
    ]);

    const [filter, setFilter] = useState("");

    const [stats, setStats] = useState({
        total: 4,
        availableCapacity:
            (1000 - 850) + (1500 - 600) + (1200 - 1200) + (800 - 500), // = 1650
        nearingFull: 2 // Delhi (85%) and Chennai (100%) are nearing/full
    });


    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                // const res = await axios.get("/api/warehouse/all");
                // setWarehouses(res.data);

                // // Calculate stats
                // const total = res.data.length;
                // const availableCapacity = res.data.reduce(
                //   (acc, wh) => acc + (wh.capacity - wh.usedCapacity),
                //   0
                // );
                // const nearingFull = res.data.filter(
                //   (wh) => wh.usedCapacity / wh.capacity >= 0.8
                // ).length;

                // setStats({ total, availableCapacity, nearingFull });
            } catch (err) {
                console.error("Error fetching warehouses", err);
            }
        };
        fetchWarehouses();
    }, []);

    const filteredWarehouses = warehouses.filter((wh) =>
        wh.name.toLowerCase().includes(filter.toLowerCase()) ||
        wh.location.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-6 w-full bg-[#FFF1F1] min-h-screen">
            {/* Add Warehouse Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#3B0270]">Warehouses</h1>
                <Link to="add"> <Button className="bg-[#6F00FF] hover:bg-[#3B0270] text-white">
                    + Add Warehouse
                </Button></Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#3B0270] text-lg">Total Warehouses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center text-[#6F00FF]">
                            {stats.total}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#3B0270] text-lg">Available Capacity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center text-green-600">
                            {stats.availableCapacity}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#3B0270] text-lg">Nearing Full Capacity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center text-red-600">
                            {stats.nearingFull}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="mb-4">
                <Input
                    placeholder="Search by warehouse name or location"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-80"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-auto">
                <Table>
                    <TableHeader className="bg-[#E9B3FB]">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Used</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {warehouses.map((wh) => {
                            const usagePercent = (wh.usedCapacity / wh.capacity) * 100;
                            let status = "";
                            let color = "";

                            if (usagePercent === 100) {
                                status = "Full";
                                color = "bg-red-600 text-white";
                            } else if (usagePercent >= 75) {
                                status = "Nearing Full";
                                color = "bg-yellow-500 text-black";
                            } else if (usagePercent >= 25) {
                                status = "Normal";
                                color = "bg-green-600 text-white";
                            } else {
                                status = "Nearly Empty";
                                color = "bg-blue-600 text-white";
                            }

                            return (
                                <TableRow key={wh._id}>
                                    <TableCell>{wh.name}</TableCell>
                                    <TableCell>{wh.location}</TableCell>
                                    <TableCell>{wh.capacity}</TableCell>
                                    <TableCell>{wh.usedCapacity}</TableCell>
                                    <TableCell>{wh.capacity - wh.usedCapacity}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
                                        >
                                            {status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {filteredWarehouses.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No warehouses found.</p>
                )}
            </div>
        </div>
    );
}
