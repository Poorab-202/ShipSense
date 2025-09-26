import { Outlet } from "react-router-dom";
import WarehouseDetails from "./admin/WarehouseDetails";
import WarehouseMap from "./admin/warehouseMap";

function WarehousePage() {
    return (
        <div className="w-252 h-120 overflow-y-auto">
            <div className="flex flex-col gap-2 items-center w-252">
                <WarehouseDetails></WarehouseDetails>
                <WarehouseMap></WarehouseMap>
            </div>
        </div>
    );
}

export default WarehousePage;