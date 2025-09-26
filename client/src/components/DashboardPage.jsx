import TodaysShipments from "./admin/TodaysShipment";
import TotalShipments from "./admin/TotalShipments";

function DashboardPage() {
    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <TotalShipments></TotalShipments>
            <TodaysShipments></TodaysShipments>
        </div>
    );
}

export default DashboardPage;