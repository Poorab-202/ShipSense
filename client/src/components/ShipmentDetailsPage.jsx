import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  updateShipment,
  addShipmentActivity,
  setError,
} from "@/redux/slice/shipmentSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/config/api";
import { toast } from "sonner";

export default function ShipmentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select shipment from Redux store
  const shipment = useSelector((state) => state.shipments.byId[id]);

  // Local state
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch shipment on mount / reload
  useEffect(() => {
    const fetchShipment = async () => {
      try {
        setLoading(true);
        const res = await axios.get(BASE_URL + `/shipment/${id}`);
        const shipmentData = res.data.data;

        dispatch(updateShipment(shipmentData));

        const lastStatus = shipmentData.activities?.length
          ? shipmentData.activities[shipmentData.activities.length - 1].status
          : "Pending Pickup";
        setStatus(lastStatus);
      } catch (err) {
        console.error("Error fetching shipment", err);
        dispatch(setError(err.message));
      } finally {
        setLoading(false);
      }
    };

    if (!shipment) {
      fetchShipment();
    } else {
      const lastStatus = shipment.activities?.length
        ? shipment.activities[shipment.activities.length - 1].status
        : "Pending Pickup";
      setStatus(lastStatus);
      setLoading(false);
    }
  }, [id, shipment, dispatch]);

  // Update shipment status
  const handleStatusUpdate = async () => {
    try {
      const res = await axios.put(BASE_URL + `/shipment/${id}/status`, {
        status,
      });
      const newActivity = res.data.data;

      dispatch(addShipmentActivity({ id, activity: newActivity }));
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Error updating status");
      console.error("Error updating status", err);
    }
  };

  // Loading state
  if (loading) return <p className="p-6">Loading shipment details...</p>;
  if (!shipment)
    return <p className="p-6 text-red-500">Shipment not found.</p>;

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
                <SelectItem value="Pending Pickup">Pending Pickup</SelectItem>
                <SelectItem value="Picked Up">Picked Up</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Arrived at Hub">Arrived at Hub</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleStatusUpdate}
              className="bg-[#6F00FF] hover:bg-[#3B0270] text-white"
            >
              Update
            </Button>
          </div>

          {/* Shipment Info */}
          <div>
            <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">
              Shipment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tracking ID</Label>
                <Input
                  value={shipment.trackingId}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Current Status</Label>
                <Input
                  value={
                    shipment.activities?.length > 0
                      ? shipment.activities[shipment.activities.length - 1]
                          .status
                      : "Pending Pickup"
                  }
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Weight (kg)</Label>
                <Input
                  value={shipment.weight}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Dimensions (HxWxL cm)</Label>
                <Input
                  value={`${shipment.dimensions?.height || 0} x ${
                    shipment.dimensions?.width || 0
                  } x ${shipment.dimensions?.length || 0}`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={shipment.description}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Pickup Date</Label>
                <Input
                  value={
                    shipment.pickupDate
                      ? new Date(shipment.pickupDate).toLocaleDateString(
                          "en-IN",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )
                      : "-"
                  }
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Expected Delivery</Label>
                <Input
                  value={
                    shipment.expectedDeliveryDate
                      ? new Date(
                          shipment.expectedDeliveryDate
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"
                  }
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Sender Info */}
          <div>
            <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">
              Sender Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input value={shipment.sender?.name || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Email</Label><Input value={shipment.sender?.email || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Phone</Label><Input value={shipment.sender?.phone || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Alternate Phone</Label><Input value={shipment.sender?.alternatePhone || ""} readOnly className="bg-gray-100" /></div>

              <div><Label>Street</Label><Input value={shipment.sender?.address?.street || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>City</Label><Input value={shipment.sender?.address?.city || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>State</Label><Input value={shipment.sender?.address?.state || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Postal Code</Label><Input value={shipment.sender?.address?.postalCode || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Country</Label><Input value={shipment.sender?.address?.country || ""} readOnly className="bg-gray-100" /></div>

              <div><Label>ID Type</Label><Input value={shipment.sender?.idType || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>ID Number</Label><Input value={shipment.sender?.idNumber || ""} readOnly className="bg-gray-100" /></div>
            </div>
          </div>

          {/* Recipient Info */}
          <div>
            <h2 className="text-lg font-semibold text-[#6F00FF] mb-2">
              Recipient Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input value={shipment.recipient?.name || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Email</Label><Input value={shipment.recipient?.email || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Phone</Label><Input value={shipment.recipient?.phone || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Alternate Phone</Label><Input value={shipment.recipient?.alternatePhone || ""} readOnly className="bg-gray-100" /></div>

              <div><Label>Street</Label><Input value={shipment.recipient?.address?.street || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>City</Label><Input value={shipment.recipient?.address?.city || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>State</Label><Input value={shipment.recipient?.address?.state || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Postal Code</Label><Input value={shipment.recipient?.address?.postalCode || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>Country</Label><Input value={shipment.recipient?.address?.country || ""} readOnly className="bg-gray-100" /></div>

              <div><Label>ID Type</Label><Input value={shipment.recipient?.idType || ""} readOnly className="bg-gray-100" /></div>
              <div><Label>ID Number</Label><Input value={shipment.recipient?.idNumber || ""} readOnly className="bg-gray-100" /></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
