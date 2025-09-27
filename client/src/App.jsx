import { useState } from 'react'
import './App.css'
import Login from './components/auth/login'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import AddShipment from './components/AddShipment';
import DashboardPage from './components/DashboardPage';
import ShipmentsPage from './components/ShipmentPage';
import ShipmentDetailsPage from './components/ShipmentDetailsPage';
import WarehousePage from './components/WarehousePage';
import AddWarehouse from './components/admin/AddWarehouse';
import WarehouseDetails from './components/admin/WarehouseDetails';
import SingleWarehouse from './components/admin/SingleWarehouse';
import UserManagement from './components/admin/UserManagement';
import AddUser from './components/admin/AddUser';
import InventoryPage from './components/InventoryPage';
import AddInventory from './components/admin/AddInventory';
import { Toaster } from 'sonner';
import Signup from './components/auth/Signup';


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen></HomeScreen>,
    children:
      [
        {
          index: true,
          element: <DashboardPage></DashboardPage>
        },
        {
          path: "/shipment/add",
          element: <AddShipment></AddShipment>
        },
        {
          path: "/shipment",
          element: <ShipmentsPage></ShipmentsPage>
        },
        {
          path: "/shipment/update/:id",
          element: <ShipmentDetailsPage></ShipmentDetailsPage>
        },
        {
          path: "/warehouse",
          element: <WarehousePage></WarehousePage>
        },
        {
          path: "/warehouse/add",
          element: <AddWarehouse></AddWarehouse>
        },
        {
          path: "/warehouse/:id",
          element: <SingleWarehouse></SingleWarehouse>
        },
        {
          path: "/users",
          element: <UserManagement></UserManagement>
        },
        {
          path: "/users/add",
          element: <AddUser></AddUser>
        },
        {
          path: "/inventory",
          element: <AddInventory></AddInventory>
        },
      ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/signup",
    element: <Signup></Signup>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
      <Toaster richColors position="top-right"></Toaster>
    </>
  )
}

export default App
