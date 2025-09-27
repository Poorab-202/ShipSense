import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

export default function TotalShipments() {
 // Stats
const [stats, setStats] = useState({
  total: 120,
  pending: 35,
  delivered: 70,
  cancelled: 15
});

// Trend Data (shipments over time)
const [trendData, setTrendData] = useState([
  { date: "2025-09-20", shipments: 12 },
  { date: "2025-09-21", shipments: 18 },
  { date: "2025-09-22", shipments: 25 },
  { date: "2025-09-23", shipments: 15 },
  { date: "2025-09-24", shipments: 20 },
  { date: "2025-09-25", shipments: 10 },
  { date: "2025-09-26", shipments: 20 }
]);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const res = await axios.get("/api/shipment/stats");
        // setStats(res.data.stats);
        // setTrendData(res.data.trend);
      } catch (err) {
        console.error("Error fetching shipment stats", err);
      }
    };
    fetchStats();
  }, []);

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Delivered", value: stats.delivered },
    { name: "Cancelled", value: stats.cancelled },
  ];

  const COLORS = ["#6F00FF", "#3B0270", "#E9B3FB"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Shipment Stats */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-xl font-bold">Total Shipments Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center w-full">
            <div className="bg-[#FFF1F1] rounded-xl p-4">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-[#3B0270]">{stats.total}</p>
            </div>
            <div className="bg-[#FFF1F1] rounded-xl p-4">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-[#6F00FF]">{stats.pending}</p>
            </div>
            <div className="bg-[#FFF1F1] rounded-xl p-4">
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <div className="bg-[#FFF1F1] rounded-xl p-4">
              <p className="text-sm text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            </div>
          </div>

          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-xl font-bold">Shipments Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="shipments" stroke="#6F00FF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}