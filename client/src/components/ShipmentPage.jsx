import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Link, useNavigate } from "react-router-dom";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
       const res = await axios.get("/api/shipment/all");
        setShipments(res);
      } catch (err) {
        console.error("Error fetching shipments", err);
      }
    };
    fetchShipments();
  }, []);

  const filteredShipments = shipments.filter(
    (s) =>
      s.trackingID.toLowerCase().includes(filter.toLowerCase()) ||
      s.sender.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.recipient.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-252 p-6 bg-white min-h-screen">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#3B0270]">Shipments</h1>
        <Button
          onClick={() => navigate("/shipment/add")}
          className="bg-[#6F00FF] hover:bg-[#3B0270] text-white"
        >
          + Add Shipment
        </Button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <Input
          placeholder="Filter by Tracking ID, Sender, or Recipient"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-80"
        />
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-xl shadow-md overflow-auto">
        <Table>
          <TableHeader className="bg-[#E9B3FB]">
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>Pickup Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((shipment) => (
              <TableRow key={shipment._id}>
                <TableCell>{shipment.trackingID}</TableCell>
                <TableCell>{shipment.sender.name}</TableCell>
                <TableCell>{shipment.recipient.name}</TableCell>
                <TableCell>{shipment.weight}</TableCell>
                <TableCell>{shipment.pickupDate}</TableCell>
                <TableCell>{shipment.expectedDate}</TableCell>
                <TableCell>{shipment.status}</TableCell>
                <TableCell><Button onClick={() => navigate("/shipment/update/:1234")} className="cursor-pointer">Open</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredShipments.length === 0 && (
          <p className="text-center text-gray-500 py-4">No shipments found.</p>
        )}
      </div>
    </div>
  );
}