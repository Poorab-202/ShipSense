import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TodaysShipments() {
  const [data, setData] = useState({ pickups: 10, deliveries: 20, tickets: 5 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get("/api/dashboard/today");
        // setData(res.data);
      } catch (err) {
        console.error("Error fetching today's data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Pickups */}
      <Card className="shadow-lg rounded-2xl bg-[#FFF1F1]">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-lg font-bold">Pickups Today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold text-[#6F00FF] text-center">
            {data.pickups}
          </p>
        </CardContent>
      </Card>

      {/* Deliveries */}
      <Card className="shadow-lg rounded-2xl bg-[#FFF1F1]">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-lg font-bold">Deliveries Today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold text-green-600 text-center">
            {data.deliveries}
          </p>
        </CardContent>
      </Card>

      {/* Customer Tickets */}
      <Card className="shadow-lg rounded-2xl bg-[#FFF1F1]">
        <CardHeader>
          <CardTitle className="text-[#3B0270] text-lg font-bold">Customer Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold text-red-600 text-center">
            {data.tickets}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}