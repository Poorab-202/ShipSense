import { useState } from 'react'
import './App.css'
import Login from './components/auth/Login'
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
    element: <Login></Login>
  },
  {
    path: "/sign",
    element: <Signup></Signup>
  },
  {
    path: "/home",
    element: <HomeScreen></HomeScreen>,
    children:
      [
        {
          index: true,
          element: <DashboardPage></DashboardPage>
        },
        {
          path: "/home/shipment/add",
          element: <AddShipment></AddShipment>
        },
        {
          path: "/home/shipment",
          element: <ShipmentsPage></ShipmentsPage>
        },
        {
          path: "/home/shipment/update/:id",
          element: <ShipmentDetailsPage></ShipmentDetailsPage>
        },
        {
          path: "/home/warehouse",
          element: <WarehousePage></WarehousePage>
        },
        {
          path: "/home/warehouse/add",
          element: <AddWarehouse></AddWarehouse>
        },
        {
          path: "/home/warehouse/:id",
          element: <SingleWarehouse></SingleWarehouse>
        },
        {
          path: "/home/users",
          element: <UserManagement></UserManagement>
        },
        {
          path: "/home/users/add",
          element: <AddUser></AddUser>
        },
        {
          path: "/home/inventory",
          element: <AddInventory></AddInventory>
        },
      ]
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
