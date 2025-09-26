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

export default function InventoryPage() {
    const [items, setItems] = useState([
        {
            _id: "inv001",
            name: "Carton Boxes",
            sku: "CTN-1001",
            quantity: 200,
            unit: "units",
            threshold: 50
        },
        {
            _id: "inv002",
            name: "Bubble Wrap",
            sku: "BWR-2001",
            quantity: 20,
            unit: "rolls",
            threshold: 30
        },
        {
            _id: "inv003",
            name: "Packing Tape",
            sku: "PTP-3001",
            quantity: 0,
            unit: "rolls",
            threshold: 20
        },
        {
            _id: "inv004",
            name: "Wooden Pallets",
            sku: "WPL-4001",
            quantity: 120,
            unit: "units",
            threshold: 40
        },
        {
            _id: "inv005",
            name: "Plastic Crates",
            sku: "PCR-5001",
            quantity: 10,
            unit: "units",
            threshold: 15
        }
    ]);

    const [filter, setFilter] = useState("");
    const [stats, setStats] = useState({
        total: 5,
        lowStock: 2,   // Bubble Wrap (20 ≤ 30), Plastic Crates (10 ≤ 15)
        outOfStock: 1  // Packing Tape (0)
    });

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // const res = await axios.get("/api/inventory/all");
                // setItems(res.data);

                // Calculate stats
                const total = res.data.length;
                const lowStock = res.data.filter((i) => i.quantity > 0 && i.quantity <= i.threshold).length;
                const outOfStock = res.data.filter((i) => i.quantity === 0).length;

                setStats({ total, lowStock, outOfStock });
            } catch (err) {
                console.error("Error fetching inventory", err);
            }
        };
        fetchInventory();
    }, []);

    const filteredItems = items.filter((i) =>
        [i.name, i.sku].some((field) =>
            field.toLowerCase().includes(filter.toLowerCase())
        )
    );

    return (
        <div className="p-6 w-full bg-[#FFF1F1] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#3B0270]">Inventory</h1>
                <Button className="bg-[#6F00FF] hover:bg-[#3B0270] text-white">
                    + Add New Inventory
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#3B0270] text-lg">Total Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center text-[#6F00FF]">
                            {stats.total}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#3B0270] text-lg">Low Stock Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center text-yellow-500">
                            {stats.lowStock}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[#3B0270] text-lg">Out of Stock Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center text-red-600">
                            {stats.outOfStock}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="mb-4">
                <Input
                    placeholder="Search by name or SKU"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-80"
                />
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl shadow-md overflow-auto">
                <Table>
                    <TableHeader className="bg-[#E9B3FB]">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>SKU/ID</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Threshold</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems.map((item) => {
                            let status = "Normal";
                            let color = "text-green-600";

                            if (item.quantity === 0) {
                                status = "Out of Stock";
                                color = "text-red-600";
                            } else if (item.quantity <= item.threshold) {
                                status = "Low Stock";
                                color = "text-yellow-500";
                            }

                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>{item.threshold}</TableCell>
                                    <TableCell className={`font-semibold ${color}`}>{status}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {filteredItems.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No inventory found.</p>
                )}
            </div>
        </div>
    );
}
