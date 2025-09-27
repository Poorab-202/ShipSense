import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addWarehouse } from "@/redux/slice/warehouseSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { BASE_URL } from "@/config/api";
import { toast } from "sonner";

export default function AddWarehouse({ onClose, onSuccess }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    managerId: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      coordinates: { lat: "", lng: "" }
    }
  });

  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch managers
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get(BASE_URL + "/users/managers");
        setManagers(res.data.data || []);
      } catch (err) {
        console.error("Error fetching managers", err);
        toast.error("Failed to fetch managers");
      }
    };
    fetchManagers();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLocationChange = (field, value) => {
    setFormData({
      ...formData,
      location: { ...formData.location, [field]: value }
    });
  };

  const handleCoordinatesChange = (field, value) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        coordinates: { ...formData.location.coordinates, [field]: value }
      }
    });
  };

  const handleManagerSelect = (id) => {
    handleChange("managerId", id);
    const manager = managers.find((m) => m._id === id);
    setSelectedManager(manager || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        capacity: Number(formData.capacity),
        location: {
          address: formData.location.address,
          city: formData.location.city,
          state: formData.location.state,
          country: formData.location.country,
          coordinates: {
            lat: Number(formData.location.coordinates.lat),
            lng: Number(formData.location.coordinates.lng),
          }
        },
        inventory: [],
        staff: []
      };

      const res = await axios.post(BASE_URL + "/warehouse/add", payload);

      if (res.data.success) {
        dispatch(addWarehouse(res.data.data));
        toast.success("Warehouse added successfully");

        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        toast.error(res.data.message || "Failed to add warehouse");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add warehouse";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#3B0270]">Add Warehouse</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter warehouse name"
                required
              />
            </div>

            {/* Capacity */}
            <div>
              <Label>Capacity</Label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                placeholder="Enter total capacity"
                required
              />
            </div>

            {/* Location */}
            <div>
              <h3 className="text-md font-semibold text-[#6F00FF] mt-4">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Address"
                  value={formData.location.address}
                  onChange={(e) => handleLocationChange("address", e.target.value)}
                  required
                />
                <Input
                  placeholder="City"
                  value={formData.location.city}
                  onChange={(e) => handleLocationChange("city", e.target.value)}
                />
                <Input
                  placeholder="State"
                  value={formData.location.state}
                  onChange={(e) => handleLocationChange("state", e.target.value)}
                />
                <Input
                  placeholder="Country"
                  value={formData.location.country}
                  onChange={(e) => handleLocationChange("country", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Latitude"
                  value={formData.location.coordinates.lat}
                  onChange={(e) => handleCoordinatesChange("lat", e.target.value)}
                  required
                />
                <Input
                  type="number"
                  placeholder="Longitude"
                  value={formData.location.coordinates.lng}
                  onChange={(e) => handleCoordinatesChange("lng", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Manager */}
            {/* <div>
              <Label>Assign Manager</Label>
              <Select value={formData.managerId} onValueChange={handleManagerSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Manager" />
                </SelectTrigger>
                <SelectContent>
                  {managers.map((m) => (
                    <SelectItem key={m._id} value={m._id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Selected Manager Info */}
            {/* {selectedManager && (
              <div className="bg-[#FFF1F1] p-3 rounded-lg text-sm">
                <p><strong>Contact:</strong> {selectedManager.contactNumber || "N/A"}</p>
                <p><strong>Email:</strong> {selectedManager.email}</p>
              </div>
            )} */}

            {/* Error */}
            {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}

            {/* Actions */}
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
