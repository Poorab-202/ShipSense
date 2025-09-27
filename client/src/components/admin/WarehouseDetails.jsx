import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setWarehouses,
  setStats,
  setLoading,
  setError,
} from "@/redux/slice/warehouseSlice";
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
import { BASE_URL } from "@/config/api";

export default function WarehouseDetails() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const warehousesById = useSelector((state) => state.warehouses.byId);
  const warehouseIds = useSelector((state) => state.warehouses.allIds);
  const stats = useSelector((state) => state.warehouses.stats);
  const loading = useSelector((state) => state.warehouses.loading);
  const error = useSelector((state) => state.warehouses.error);

  const warehouses = warehouseIds.map((id) => warehousesById[id]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(BASE_URL + "/warehouse");
        const data = res.data.data || [];

        dispatch(setWarehouses(data));

        // Calculate stats
        const total = data.length;
        const availableCapacity = data.reduce(
          (acc, wh) => acc + (wh.capacity - wh.usedCapacity),
          0
        );
        const nearingFull = data.filter(
          (wh) => wh.usedCapacity / wh.capacity >= 0.8
        ).length;

        dispatch(setStats({ total, availableCapacity, nearingFull }));
      } catch (err) {
        console.error("Error fetching warehouses", err);
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchWarehouses();
  }, [dispatch]);

  const filteredWarehouses = warehouses.filter(
    (wh) =>
      wh.name.toLowerCase().includes(filter.toLowerCase()) ||
      wh.location.city?.toLowerCase().includes(filter.toLowerCase()) ||
      wh.location.state?.toLowerCase().includes(filter.toLowerCase()) ||
      wh.location.country?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full min-h-full bg-white rounded-xl shadow p-6">
      {/* Add Warehouse Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#3B0270]">Warehouses</h1>
        <Link to="add">
          <Button className="bg-[#6F00FF] hover:bg-[#3B0270] text-white">
            + Add Warehouse
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#3B0270] text-lg">
              Total Warehouses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center text-[#6F00FF]">
              {stats?.total || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#3B0270] text-lg">
              Available Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center text-green-600">
              {stats?.availableCapacity || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#3B0270] text-lg">
              Nearing Full Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center text-red-600">
              {stats?.nearingFull || 0}
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

      {/* Loading/Error */}
      {loading && <p className="text-gray-500">Loading warehouses...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWarehouses.map((wh) => {
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
                  <TableCell>
                    {`${wh.location.address}, ${wh.location.city}, ${wh.location.state}, ${wh.location.country}`}
                  </TableCell>
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
                  <TableCell>
                    <Link to={`/warehouse/${wh._id}`}>
                      <Button>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredWarehouses.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-4">
            No warehouses found.
          </p>
        )}
      </div>
    </div>
  );
}
