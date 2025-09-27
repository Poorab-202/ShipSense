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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/config/api";
import { toast } from "sonner";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(BASE_URL + "/users");
        console.log(res.data.data);
        
        setUsers(res.data.data || []);
      } catch (err) {
        console.error("Error fetching users", err);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((u) =>
      [u.name, u.email].some((field) =>
        field?.toLowerCase().includes(filter.toLowerCase())
      )
    )
    .filter((u) => (roleFilter !== "all" ? u.role === roleFilter : true))
    .filter((u) => (statusFilter !== "all" ? u.status === statusFilter : true))
    .sort((a, b) => {
      if (sortField === "createdAt" || sortField === "lastLogin") {
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === "asc"
          ? (a[sortField] || "").localeCompare(b[sortField] || "")
          : (b[sortField] || "").localeCompare(a[sortField] || "");
      }
    });

    if(users?.length===0) return (<p>Loading...</p>)

  return (
    <div className="p-6 w-full bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#3B0270]">User Management</h1>
        <Link to="/users/add">
          <Button className="bg-[#6F00FF] hover:bg-[#3B0270] text-white">
            + Add New User
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <Input
          placeholder="Search by name or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-64"
        />

        <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="WarehouseStaff">Warehouse Staff</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortField} onValueChange={(v) => setSortField(v)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created Date</SelectItem>
            <SelectItem value="lastLogin">Last Login</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Table */}
      <Card className="bg-white shadow-md rounded-2xl">
        <CardContent>
          <Table>
            <TableHeader className="bg-[#E9B3FB]">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                let statusColor =
                  user.status === "Inactive"
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white";

                return (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {user.warehouse
                        ? user.warehouse.name || user.warehouse.location?.city
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString("en-IN")
                        : "Never"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 py-4">No users found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
