import Navbar from "../components/Navbar"

const ManagerDashboard = () => {

  const username =
    localStorage.getItem(
      "username"
    );

  return (
    <div>
    <Navbar />

    <div className="p-10">

      <h1
        className="
        text-4xl
        font-bold"
      >
        Manager Dashboard
      </h1>

      <p>
        Welcome {username}
      </p>

    </div>
    </div>
  );

};

export default ManagerDashboard;