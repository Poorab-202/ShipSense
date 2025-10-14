import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateWarehouse } from "@/redux/slice/warehouseSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { BASE_URL } from "@/config/api";

export default function AddUser({ onClose, onSuccess }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "WarehouseStaff",
    warehouse: "",
  });

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch warehouses for assignment
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const res = await axios.get(BASE_URL + "/warehouse");
        setWarehouses(res.data.data || []);
      } catch (err) {
        console.error("Error fetching warehouses", err);
        toast.error("Failed to load warehouses");
      }
    };
    fetchWarehouses();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create User
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        role: formData.role,
        warehouse:
          formData.role === "Manager" || formData.role === "WarehouseStaff"
            ? formData.warehouse
            : null,
      };

      const res = await axios.post(BASE_URL + "/users/add", payload);

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to create user");
        return;
      }

      const newUser = res.data.data;

      // 2️⃣ Call backend to link user with warehouse
      if (formData.role === "Manager" || formData.role === "WarehouseStaff") {
        const assignRes = await axios.post(BASE_URL + "/warehouse/assignUser", {
          warehouseId: formData.warehouse,
          userId: newUser._id,
          role: formData.role,
        });

        if (assignRes.data.success) {
          dispatch(updateWarehouse(assignRes.data.data.warehouse));
        } else {
          toast.error(assignRes.data.message || "Failed to assign warehouse");
        }
      }

      toast.success("User created successfully!");

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      console.error("Error creating user", err);
      toast.error(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#3B0270]">
            Add User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input className="my-1"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input className="my-1"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input className="my-1"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <Label>Contact Number</Label>
              <Input className="my-1"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                placeholder="Enter contact number"
              />
            </div>

            {/* Role */}
            <div>
              <Label>Role</Label>
              <div className="my-1">
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="WarehouseStaff">
                      Warehouse Staff
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Warehouse Dropdown */}
            {(formData.role === "Manager" ||
              formData.role === "WarehouseStaff") && (
                <div>
                  <Label>Assign Warehouse</Label>
                   <div className="my-1"></div>
                  <Select
                    value={formData.warehouse}
                    onValueChange={(value) => handleChange("warehouse", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((wh) => (
                        <SelectItem key={wh._id} value={wh._id}>
                          {wh.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#6F00FF] hover:bg-[#3B0270] text-white"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
