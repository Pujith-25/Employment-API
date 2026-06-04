import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDashboardStats }
from "../services/dashboard.service";

const AdminDashboard = () => {

  const username =
    localStorage.getItem("username");

  const [stats, setStats] =
    useState<any>();

  useEffect(() => {

    const load =
      async () => {

        const data =
          await getDashboardStats();

        setStats(data);
      };

    load();

  }, []);

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mb-6">
          Welcome {username}
        </p>

        <div className="grid grid-cols-4 gap-4">

          <div className="border p-4">
            Customers
            <h2>{stats?.customers}</h2>
          </div>

          <div className="border p-4">
            Cars
            <h2>{stats?.cars}</h2>
          </div>

          <div className="border p-4">
            Salesmen
            <h2>{stats?.salesmen}</h2>
          </div>

          <div className="border p-4">
            Orders
            <h2>{stats?.orders}</h2>
          </div>

        </div>

      </div>
    </>
  );
};

export default AdminDashboard;