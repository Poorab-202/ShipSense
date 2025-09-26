import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

export default function ShipmentDetails() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        // const res = await axios.get(`/api/shipment/${id}`);
        // setShipment(res.data);
        const res = {

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

        }
        setShipment(res);
        setStatus(res.data.status || "Pending");
      } catch (err) {
        console.error("Error fetching shipment", err);
      }
    };
    fetchShipment();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`/api/shipment/${id}/status`, { status });
      alert("Status updated successfully");
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  if (!shipment) return <p className="p-6">Loading shipment details...</p>;

  return (
    <div className="p-6 w-full bg-[#FFF1F1] min-h-screen">
      <Card className="shadow-lg rounded-2xl p-4">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-2xl font-bold">
            Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Update Section */}
          <div className="flex items-center space-x-4">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleStatusUpdate} className="bg-[#6F00FF] hover:bg-[#3B0270] text-white">
              Update
            </Button>
          </div>

          {/* Shipment Info (View Only) */}
          <div>
            <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">Shipment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tracking ID</Label>
                <Input value={shipment.trackingID} readOnly className="bg-gray-100" />
              </div>
              <div>
                <Label>Current Status</Label>
                <Input value={shipment.status} readOnly className="bg-gray-100" />
              </div>
              <div>
                <Label>Weight (kg)</Label>
                <Input value={shipment.weight} readOnly className="bg-gray-100" />
              </div>
              <div>
                <Label>Dimensions (HxWxL cm)</Label>
                <Input value={`${shipment.height} x ${shipment.width} x ${shipment.length}`} readOnly className="bg-gray-100" />
              </div>
              <div>
                <Label>Description</Label>
                <Input value={shipment.description} readOnly className="bg-gray-100" />
              </div>
              <div>
                <Label>Pickup Date</Label>
                <Input value={shipment.pickupDate} readOnly className="bg-gray-100" />
              </div>
              <div>
                <Label>Expected Delivery</Label>
                <Input value={shipment.expectedDate} readOnly className="bg-gray-100" />
              </div>
            </div>
          </div>

          {/* Sender Info (View Only) */}
          <div>
            <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">Sender Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input value={shipment.sender.name} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.email} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.street} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.city} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.state} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.postalCode} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.country} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.contact} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.alternateContact} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.idType} readOnly className="bg-gray-100" />
              <Input value={shipment.sender.idNumber} readOnly className="bg-gray-100" />
            </div>
          </div>

          {/* Recipient Info (View Only) */}
          <div>
            <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">Recipient Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input value={shipment.recipient.name} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.email} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.street} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.city} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.state} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.postalCode} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.country} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.contact} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.alternateContact} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.idType} readOnly className="bg-gray-100" />
              <Input value={shipment.recipient.idNumber} readOnly className="bg-gray-100" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}