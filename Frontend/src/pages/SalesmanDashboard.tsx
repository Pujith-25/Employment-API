import Navbar from "../components/Navbar";

const SalesmanDashboard = () => {

  const username =
    localStorage.getItem("username");

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1
          className="
          text-3xl
          font-bold
          mb-6"
        >
          Salesman Dashboard
        </h1>

        <div
          className="
          grid
          grid-cols-2
          gap-4"
        >

          <div
            className="
            border
            p-4
            rounded"
          >
            <h2 className="font-bold">
              Profile
            </h2>

            <p>
              Username: {username}
            </p>
          </div>

          <div
            className="
            border
            p-4
            rounded"
          >
            <h2 className="font-bold">
              My Orders
            </h2>

            <p>
              View your orders
            </p>
          </div>

        </div>

      </div>
    </>
  );

};

export default SalesmanDashboard;