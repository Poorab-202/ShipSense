import { Outlet } from "react-router-dom";
import WarehouseDetails from "./admin/WarehouseDetails";
import WarehouseMap from "./admin/warehouseMap";

function WarehousePage() {
    return (
        <div className="w-full min-h-full bg-white rounded-xl shadow p-6">

            <WarehouseDetails></WarehouseDetails>
            <WarehouseMap></WarehouseMap>

        </div>
    );
}

export default WarehousePage;