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
        }
      ]
  },
  {
    path: "/login",
    element: <Login></Login>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
