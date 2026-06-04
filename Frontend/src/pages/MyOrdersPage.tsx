import Navbar from "../components/Navbar";

const MyOrdersPage = () => {

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        <p>
          Salesman specific orders
        </p>

      </div>
    </>
  );

};

export default MyOrdersPage;