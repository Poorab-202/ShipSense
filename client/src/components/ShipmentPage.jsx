import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setShipments, setLoading, setError } from "../redux/slice/shipmentSlice.js";
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
import { BASE_URL } from "@/config/api";

export default function ShipmentsPage() {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shipmentsById = useSelector((state) => state.shipments.byId);
  const shipmentIds = useSelector((state) => state.shipments.allIds);
  const loading = useSelector((state) => state.shipments.loading);
  const error = useSelector((state) => state.shipments.error);

  const shipments = shipmentIds.map((id) => shipmentsById[id]);

  useEffect(() => {
    const fetchShipments = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(BASE_URL + "/shipment/get");
        dispatch(setShipments(res.data.data)); // ✅ load into store
      } catch (err) {
        console.error("Error fetching shipments", err);
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchShipments();
  }, [dispatch]);

  const filteredShipments = shipments.filter((s) => {
    const trackingId = s.trackingId || "";
    const senderName = s.sender?.name || "";
    const recipientName = s.recipient?.name || "";

    return (
      trackingId.toLowerCase().includes(filter.toLowerCase()) ||
      senderName.toLowerCase().includes(filter.toLowerCase()) ||
      recipientName.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className="w-full min-h-full bg-white rounded-xl shadow p-6">
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

      {/* Loading / Error */}
      {loading && <p className="text-gray-500">Loading shipments...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

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
                <TableCell>{shipment.trackingId}</TableCell>
                <TableCell>{shipment.sender?.name || "-"}</TableCell>
                <TableCell>{shipment.recipient?.name || "-"}</TableCell>
                <TableCell>{shipment.weight}</TableCell>
                <TableCell>
                  {shipment.pickupDate
                    ? new Date(shipment.pickupDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </TableCell>
                <TableCell>
                  {shipment.expectedDeliveryDate
                    ? new Date(shipment.expectedDeliveryDate).toLocaleDateString(
                        "en-IN",
                        { day: "2-digit", month: "short", year: "numeric" }
                      )
                    : "-"}
                </TableCell>
                <TableCell>
                  {shipment.activities?.length > 0
                    ? shipment.activities[shipment.activities.length - 1].status
                    : "Pending Pickup"}
                </TableCell>
                <TableCell>
                  <Link to={`/shipment/update/${shipment._id}`}>
                    <Button className="cursor-pointer">Open</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredShipments.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-4">
            No shipments found.
          </p>
        )}
      </div>
    </div>
  );
}
