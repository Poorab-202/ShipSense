import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BASE_URL } from "@/config/api";

export default function SingleWarehouse() {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/warehouse/${id}`);
        setWarehouse(res.data.data || null);
      } catch (err) {
        console.error("Error fetching warehouse details", err);
        setError("Failed to load warehouse details");
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouse();
  }, [id]);

  if (loading) return <p className="p-6">Loading warehouse details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!warehouse) return <p className="p-6">No warehouse data available.</p>;

  const usagePercent = ((warehouse.usedCapacity / warehouse.capacity) * 100).toFixed(1);

  return (
    <div className="p-6 w-full bg-[#FFF1F1] min-h-screen space-y-6">
      {/* Warehouse Info */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-2xl font-bold">
            {warehouse.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Address:</strong>{" "}
            {`${warehouse.location?.address || ""}, ${warehouse.location?.city || ""}, ${warehouse.location?.state || ""}, ${warehouse.location?.country || ""}`}
          </p>
          <p>
            <strong>Manager:</strong> {warehouse.manager?.name || "-"}
          </p>
          <p>
            <strong>Contact:</strong> {warehouse.manager?.contactNumber || "-"}
          </p>
          <p>
            <strong>Email:</strong> {warehouse.manager?.email || "-"}
          </p>
        </CardContent>
      </Card>

      {/* Capacity Usage */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-xl font-bold">
            Capacity Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Used: {warehouse.usedCapacity} / {warehouse.capacity} (
            {usagePercent}%)
          </p>
          <Progress value={usagePercent} className="mt-2" />
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-xl font-bold">
            Inventory Stored
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-[#E9B3FB]">
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouse.inventory?.length > 0 ? (
                warehouse.inventory.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500"
                  >
                    No inventory data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Shipments */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-xl font-bold">
            Recent Shipments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-[#E9B3FB]">
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouse.recentShipments?.length > 0 ? (
                warehouse.recentShipments.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{s.trackingID}</TableCell>
                    <TableCell>{s.type}</TableCell>
                    <TableCell>
                      {new Date(s.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500"
                  >
                    No recent shipments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
