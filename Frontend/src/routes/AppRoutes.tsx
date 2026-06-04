import {
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import AdminDashboard from "../pages/AdminDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import SalesmanDashboard from "../pages/SalesmanDashboard";

import CustomersPage from "../pages/CustomersPage";
import CarsPage from "../pages/CarsPage";
import SalesmenPage from "../pages/SalesmenPage";
import OrdersPage from "../pages/OrdersPage";

import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage
from "../pages/ProfilePage";

import MyOrdersPage
from "../pages/MyOrdersPage";

const AppRoutes = () => {

  return (
    <Routes>

      <Route
        path="/"
        element={<LoginPage />}
      />

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <CustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/cars"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <CarsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/salesmen"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <SalesmenPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      {/* MANAGER */}

      <Route
        path="/manager"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "MANAGER"
            ]}
          >
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/customers"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "MANAGER"
            ]}
          >
            <CustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/cars"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "MANAGER"
            ]}
          >
            <CarsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/orders"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "MANAGER"
            ]}
          >
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      {/* SALESMAN */}

      <Route
        path="/salesman"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "MANAGER",
              "SALESMAN"
            ]}
          >
            <SalesmanDashboard />
          </ProtectedRoute>
        }
      />
<Route
  path="/salesman/profile"
  element={
    <ProtectedRoute
      allowedRoles={[
        "SALESMAN"
      ]}
    >
      <ProfilePage />
    </ProtectedRoute>
  }
/>

<Route
  path="/salesman/my-orders"
  element={
    <ProtectedRoute
      allowedRoles={[
        "SALESMAN"
      ]}
    >
      <MyOrdersPage />
    </ProtectedRoute>
  }
/>
      <Route
        path="/salesman/orders"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "MANAGER",
              "SALESMAN"
            ]}
          >
            <OrdersPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );

};

export default AppRoutes;