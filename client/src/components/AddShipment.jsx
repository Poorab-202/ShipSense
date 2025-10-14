import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { BASE_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";

export default function AddShipment() {
  const [trackingId, setTrackingId] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    weight: "",
    description: "",
    pickupDate: "",
    dimensions: { height: "", width: "", length: "" },
    sender: {
      name: "",
      email: "",
      phone: "",
      alternatePhone: "",
      address: { street: "", city: "", state: "", postalCode: "", country: "" },
      idType: "Aadhar",
      idNumber: "",
    },
    recipient: {
      name: "",
      email: "",
      phone: "",
      alternatePhone: "",
      address: { street: "", city: "", state: "", postalCode: "", country: "" },
      idType: "Aadhar",
      idNumber: "",
    },
  });

  // 🔹 handleChange updated to support nested address
  const handleChange = (section, field, value, nested = null) => {
    if (section === "shipment") {
      setFormData({ ...formData, [field]: value });
    } else if (section === "dimensions") {
      setFormData({
        ...formData,
        dimensions: { ...formData.dimensions, [field]: value },
      });
    } else if (nested === "address") {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          address: { ...formData[section].address, [field]: value },
        },
      });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    }
  };


  // 🔹 Fetch tracking ID from backend
  useEffect(() => {
    const fetchTrackingID = async () => {
      try {
        const res = await axios.get(BASE_URL + "/shipment/getTrackingId");
        setTrackingId(res.data.trackingId);
      } catch (err) {
        toast.error("Error fetching tracking ID", err);
      }
    };
    fetchTrackingID();
  }, []);

  // 🔹 Auto-calc expected delivery date
  useEffect(() => {
    if (formData.pickupDate) {
      const pickup = new Date(formData.pickupDate);
      const delivery = new Date(pickup);
      delivery.setDate(pickup.getDate() + 5);
      setExpectedDeliveryDate(delivery.toISOString().split("T")[0]);
    } else {
      setExpectedDeliveryDate("");
    }
  }, [formData.pickupDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        trackingId,
        description: formData.description,
        weight: formData.weight,
        dimensions: formData.dimensions,
        pickupDate: formData.pickupDate,
        expectedDeliveryDate,
        sender: formData.sender,
        recipient: formData.recipient,
      };

      const res = await axios.post(BASE_URL + "/shipment/add", payload);
      toast.success("Shipment Added Successfully!");
      navigate("/shipment");

    } catch (err) {
      toast.error("Error adding shipment");
      console.error("Error adding shipment", err);
    }
  };

  return (
    <div className="w-full min-h-full bg-white rounded-xl shadow p-6">
      <Card className="shadow-lg rounded-2xl p-4">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-2xl font-bold">
            Add Shipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipment Details */}
            <div>
              <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">
                Shipment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Tracking ID</Label>
                  <Input value={trackingId} readOnly className="my-1 bg-gray-100" />
                </div>
                <div>
                  <Label>Weight (kg)</Label>
                  <Input className="my-1"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange("shipment", "weight", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Height (cm)</Label>
                  <Input className="my-1"
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) => handleChange("dimensions", "height", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Width (cm)</Label>
                  <Input className="my-1"
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) => handleChange("dimensions", "width", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Length (cm)</Label>
                  <Input className="my-1"
                    type="number"
                    value={formData.dimensions.length}
                    onChange={(e) => handleChange("dimensions", "length", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Input className="my-1"
                    value={formData.description}
                    onChange={(e) => handleChange("shipment", "description", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Pickup Date</Label>
                  <Input className="my-1"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleChange("shipment", "pickupDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Expected Delivery Date</Label>
                  <Input value={expectedDeliveryDate} readOnly className="my-1 bg-gray-100" />
                </div>
              </div>
            </div>




            {/* Sender Details */}
            <div>
              <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">Sender Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input className="my-1" placeholder="Name" value={formData.sender.name} onChange={(e) => handleChange("sender", "name", e.target.value)} />
                <Input className="my-1" placeholder="Email" value={formData.sender.email} onChange={(e) => handleChange("sender", "email", e.target.value)} />
                <Input className="my-1" placeholder="Street" value={formData.sender.street} onChange={(e) => handleChange("sender", "street", e.target.value)} />
                <Input className="my-1" placeholder="City" value={formData.sender.city} onChange={(e) => handleChange("sender", "city", e.target.value)} />
                <Input className="my-1" placeholder="State" value={formData.sender.state} onChange={(e) => handleChange("sender", "state", e.target.value)} />
                <Input className="my-1" placeholder="Postal Code" value={formData.sender.postalCode} onChange={(e) => handleChange("sender", "postalCode", e.target.value)} />
                <Input className="my-1" placeholder="Country" value={formData.sender.country} onChange={(e) => handleChange("sender", "country", e.target.value)} />
                <Input className="my-1" placeholder="Contact" value={formData.sender.contact} onChange={(e) => handleChange("sender", "contact", e.target.value)} />
                <Input className="my-1" placeholder="Alternate Contact" value={formData.sender.alternateContact} onChange={(e) => handleChange("sender", "alternateContact", e.target.value)} />
                <div>
                  <Label>ID Type</Label>
                   <div className="my-1">
                  <Select value={formData.sender.idType} onValueChange={(value) => handleChange("sender", "idType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aadhar">Aadhar</SelectItem>
                      <SelectItem value="Passport">Passport</SelectItem>
                      <SelectItem value="DriverLicense">Driver License</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
                </div>
                <Input className="my-1" placeholder="ID Number" value={formData.sender.idNumber} onChange={(e) => handleChange("sender", "idNumber", e.target.value)} />
              </div>
            </div>

            {/* Recipient Details */}
            <div>
              <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">Recipient Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input className="my-1" placeholder="Name" value={formData.recipient.name} onChange={(e) => handleChange("recipient", "name", e.target.value)} />
                <Input className="my-1" placeholder="Email" value={formData.recipient.email} onChange={(e) => handleChange("recipient", "email", e.target.value)} />
                <Input className="my-1" placeholder="Street" value={formData.recipient.street} onChange={(e) => handleChange("recipient", "street", e.target.value)} />
                <Input className="my-1" placeholder="City" value={formData.recipient.city} onChange={(e) => handleChange("recipient", "city", e.target.value)} />
                <Input className="my-1" placeholder="State" value={formData.recipient.state} onChange={(e) => handleChange("recipient", "state", e.target.value)} />
                <Input className="my-1" placeholder="Postal Code" value={formData.recipient.postalCode} onChange={(e) => handleChange("recipient", "postalCode", e.target.value)} />
                <Input className="my-1" placeholder="Country" value={formData.recipient.country} onChange={(e) => handleChange("recipient", "country", e.target.value)} />
                <Input className="my-1" placeholder="Contact" value={formData.recipient.contact} onChange={(e) => handleChange("recipient", "contact", e.target.value)} />
                <Input className="my-1" placeholder="Alternate Contact" value={formData.recipient.alternateContact} onChange={(e) => handleChange("recipient", "alternateContact", e.target.value)} />
                <div>
                  <Label>ID Type</Label>
                  <div className="my-1">
                    <Select value={formData.recipient.idType} onValueChange={(value) => handleChange("recipient", "idType", value)}>
                      <SelectTrigger >
                        <SelectValue placeholder="Select ID Type" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="Aadhar">Aadhaar</SelectItem>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="DriverLicense">Driver License</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Input placeholder="ID Number" value={formData.recipient.idNumber} onChange={(e) => handleChange("recipient", "idNumber", e.target.value)} />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[#6F00FF] hover:bg-[#3B0270] text-white w-full"
            >
              Add Shipment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


