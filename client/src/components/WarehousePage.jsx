import { Outlet } from "react-router-dom";
import WarehouseDetails from "./admin/WarehouseDetails";
import WarehouseMap from "./admin/warehouseMap";

function WarehousePage() {
    return (
        <div className="h-100 w-252 overflow-y-auto">
            <WarehouseDetails></WarehouseDetails>
            <WarehouseMap></WarehouseMap>
        </div>
    );
}

export default WarehousePage;