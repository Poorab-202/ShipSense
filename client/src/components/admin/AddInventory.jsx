import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddInventory({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    unit: "",
    threshold: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/inventory/add", formData);

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add inventory item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center w-252">
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#3B0270]">Add Inventory Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Item Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter item name"
                required
              />
            </div>

            <div>
              <Label>SKU/ID</Label>
              <Input
                value={formData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                placeholder="Enter SKU/ID"
                required
              />
            </div>

            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </div>

            <div>
              <Label>Unit</Label>
              <Input
                value={formData.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                placeholder="e.g., units, rolls, kg"
                required
              />
            </div>

            <div>
              <Label>Threshold</Label>
              <Input
                type="number"
                value={formData.threshold}
                onChange={(e) => handleChange("threshold", e.target.value)}
                placeholder="Enter low stock threshold"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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