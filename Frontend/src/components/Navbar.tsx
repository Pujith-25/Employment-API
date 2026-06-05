import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const role =
    localStorage.getItem("role");

  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/");
    };

  return (

    <div
      className="
      bg-blue-700
      text-white
      p-4
      flex
      justify-between"
    >

      <div
        className="
        flex
        gap-4"
      >

        {role === "ADMIN" && (
  <>
    <Link to="/admin">
      Dashboard
    </Link>

    <Link to="/admin/customers">
      Customers
    </Link>

    <Link to="/admin/cars">
      Cars
    </Link>

    <Link to="/admin/salesmen">
      Salesmen
    </Link>

    <Link to="/admin/orders">
      Orders
    </Link>

    <Link to="/change-password">
  Change Password
</Link>
  </>
)}

        {role === "MANAGER" && (
  <>
    <Link to="/manager">
      Dashboard
    </Link>

    <Link to="/manager/customers">
      Customers
    </Link>

    <Link to="/manager/cars">
      Cars
    </Link>
    <Link to="/manager/salesmen">
      Salesmen
    </Link>

    <Link to="/manager/orders">
      Orders
    </Link>
    <Link to="/change-password">
  Change Password
</Link>
  </>
)}
        {role === "SALESMAN" && (
  <>
    <Link to="/salesman">
      Dashboard
    </Link>

    <Link to="/salesman/orders">
      Orders
    </Link>

    <Link to="/salesman/profile">
      Profile
    </Link>
    <Link to="/change-password">
  Change Password
</Link>
  </>
)}

      </div>

      <button
        onClick={handleLogout}
        className="
        bg-red-600
        px-3
        py-1"
      >
        Logout
      </button>

    </div>

  );

};

export default Navbar;