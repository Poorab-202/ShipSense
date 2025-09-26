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
    const [warehouses, setWarehouses] = useState([
        {
            _id: "wh001",
            name: "Delhi Central Warehouse",
            capacity: 1000,
            usedCapacity: 850,
            location: {
                address: "12 MG Road, Delhi",
                city: "Delhi",
                state: "Delhi",
                country: "India",
                coordinates: { lat: 28.7041, lng: 77.1025 }
            },
            inventory: [
                { itemName: "Carton Boxes", quantity: 200, unit: "units" },
                { itemName: "Bubble Wrap", quantity: 50, unit: "rolls" }
            ]
        },
        {
            _id: "wh002",
            name: "Mumbai Storage Hub",
            capacity: 1500,
            usedCapacity: 600,
            location: {
                address: "45 Marine Drive, Mumbai",
                city: "Mumbai",
                state: "Maharashtra",
                country: "India",
                coordinates: { lat: 19.076, lng: 72.8777 }
            },
            inventory: [
                { itemName: "Wooden Pallets", quantity: 120, unit: "units" },
                { itemName: "Plastic Crates", quantity: 300, unit: "units" }
            ]
        },
        {
            _id: "wh003",
            name: "Chennai Depot",
            capacity: 1200,
            usedCapacity: 1200,
            location: {
                address: "88 Anna Salai, Chennai",
                city: "Chennai",
                state: "Tamil Nadu",
                country: "India",
                coordinates: { lat: 13.0827, lng: 80.2707 }
            },
            inventory: [
                { itemName: "Cold Storage Containers", quantity: 40, unit: "units" },
                { itemName: "Steel Racks", quantity: 75, unit: "units" }
            ]
        }
    ]);


    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                // const res = await axios.get("/api/warehouse/all");
                // setWarehouses(res.data);
            } catch (err) {
                console.error("Error fetching warehouses", err);
            }
        };
        fetchWarehouses();
    }, []);

    return (
        <div className="w-160 h-[500px] rounded-xl overflow-hidden shadow-lg">
            <MapContainer center={[22.9734, 78.6569]} zoom={5} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {warehouses.map((wh) => (
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
    );
}
