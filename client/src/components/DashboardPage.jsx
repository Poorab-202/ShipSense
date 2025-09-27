import TodaysShipments from "./admin/TodaysShipment";
import TotalShipments from "./admin/TotalShipments";

function DashboardPage() {
    return (
        <div className="w-full min-h-full bg-white rounded-xl shadow p-6 flex flex-col gap-6">
            <TotalShipments></TotalShipments>
            <TodaysShipments></TodaysShipments>
        </div>
    );
}

export default DashboardPage;