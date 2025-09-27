import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import warehouseIconImg from "../../../public/warehouse-logo.png";

// Import marker images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { BASE_URL } from "@/config/api";

// Fix default icon issue in Leaflet with Webpack/Vite
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const warehouseIcon = new L.Icon({
    iconUrl: warehouseIconImg,
    iconSize: [32, 32],   // size of the icon
    iconAnchor: [16, 32], // point of the icon which corresponds to marker's location
    popupAnchor: [0, -32] // position of popup relative to the icon
});

export default function WarehouseMap() {
    const [warehouses, setWarehouses] = useState([]);


    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const res = await axios.get(BASE_URL + "/warehouse");
                console.log(res.data.data);
                setWarehouses(res.data.data);
            } catch (err) {
                console.error("Error fetching warehouses", err);
            }
        };
        fetchWarehouses();
    }, []);


    if (warehouses?.length === 0) return (<p>Loading...</p>)

    return (
        <div className="mt-5 w-full min-h-full bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl text-[#3B0270]">Map View:</h2>

            <div className="w-160 h-[500px] rounded-xl overflow-hidden shadow-lg">

                <MapContainer center={[22.9734, 78.6569]} zoom={5} className="w-full h-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    {warehouses?.map((wh) => (
                        <Marker
                            key={wh._id}
                            position={[wh.location.coordinates.lat, wh.location.coordinates.lng]}
                            icon={warehouseIcon}
                        >
                            <Popup>
                                <strong>{wh.name}</strong> <br />
                                {wh.location.city}, {wh.location.state} <br />
                                Capacity: {wh.usedCapacity}/{wh.capacity} <br />
                                Inventory Items: {wh.inventory?.length || 0}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
