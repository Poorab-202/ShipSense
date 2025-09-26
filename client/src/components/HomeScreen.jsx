import { Outlet } from "react-router-dom";
import AddShipment from "./AddShipment";
import Navbar from "./shared/Navbar";
import ShipmentsPage from "./ShipmentPage";
import Sidebar from "./Sidebar";
import Footer from "./shared/Footer";

function HomeScreen() {
    return (
        <>
            <Navbar></Navbar>
            <div className="flex">

                <Sidebar></Sidebar>

                <Outlet></Outlet>

            </div>
            <Footer></Footer>
        </>
    );
}

export default HomeScreen;