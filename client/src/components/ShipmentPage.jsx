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
import { EllipsisIcon } from 'lucide-react';

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        // const res = await axios.get("/api/shipment/all");
        const res = [
          {
            "_id": "651234abcd001",
            "trackingID": "TRK1001",
            "status": "Picked Up",
            "weight": 12.5,
            "height": 40,
            "width": 30,
            "length": 50,
            "description": "Electronic items - Laptop and accessories",
            "pickupDate": "2025-09-26",
            "expectedDate": "2025-10-01",
            "sender": {
              "name": "Ramesh Kumar",
              "email": "ramesh@example.com",
              "street": "12 MG Road",
              "city": "Bengaluru",
              "state": "Karnataka",
              "postalCode": "560001",
              "country": "India",
              "contact": "+91-9876543210",
              "alternateContact": "+91-9123456789",
              "idType": "Aadhar",
              "idNumber": "1234-5678-9012"
            },
            "recipient": {
              "name": "Anjali Sharma",
              "email": "anjali@example.com",
              "street": "45 Civil Lines",
              "city": "Delhi",
              "state": "Delhi",
              "postalCode": "110054",
              "country": "India",
              "contact": "+91-9988776655",
              "alternateContact": "",
              "idType": "Passport",
              "idNumber": "N1234567"
            }
          },
          {
            "_id": "651234abcd002",
            "status": "In Transit",
            "trackingID": "TRK1002",
            "weight": 5.2,
            "height": 20,
            "width": 15,
            "length": 25,
            "description": "Documents and Books",
            "pickupDate": "2025-09-25",
            "expectedDate": "2025-09-30",
            "sender": {
              "name": "Suresh Mehta",
              "email": "suresh@example.com",
              "street": "88 Park Street",
              "city": "Kolkata",
              "state": "West Bengal",
              "postalCode": "700016",
              "country": "India",
              "contact": "+91-9812345678",
              "alternateContact": "",
              "idType": "DriverLicense",
              "idNumber": "WB-0923456"
            },
            "recipient": {
              "name": "Priya Nair",
              "email": "priya@example.com",
              "street": "67 Marine Drive",
              "city": "Mumbai",
              "state": "Maharashtra",
              "postalCode": "400002",
              "country": "India",
              "contact": "+91-9023456789",
              "alternateContact": "",
              "idType": "Aadhar",
              "idNumber": "9876-5432-1098"
            }
          },
          {
            "_id": "651234abcd003",
            "status": "Delivered",
            "trackingID": "TRK1003",
            "weight": 25,
            "height": 60,
            "width": 40,
            "length": 70,
            "description": "Furniture - Wooden Chair",
            "pickupDate": "2025-09-27",
            "expectedDate": "2025-10-02",
            "sender": {
              "name": "Vikram Singh",
              "email": "vikram@example.com",
              "street": "22 GT Road",
              "city": "Amritsar",
              "state": "Punjab",
              "postalCode": "143001",
              "country": "India",
              "contact": "+91-9955667788",
              "alternateContact": "",
              "idType": "Other",
              "idNumber": "FURN12345"
            },
            "recipient": {
              "name": "Rohit Verma",
              "email": "rohit@example.com",
              "street": "9 Connaught Place",
              "city": "Delhi",
              "state": "Delhi",
              "postalCode": "110001",
              "country": "India",
              "contact": "+91-9011223344",
              "alternateContact": "+91-9090909090",
              "idType": "Passport",
              "idNumber": "M7654321"
            }
          }
        ]
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