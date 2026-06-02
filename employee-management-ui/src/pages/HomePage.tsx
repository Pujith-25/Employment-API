const HomePage = () => {

  const username =
    localStorage.getItem(
      "username"
    );

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center"
    >
      <h1
        className="
        text-4xl
        font-bold"
      >
        Welcome {username}
      </h1>
    </div>
  );

};

export default HomePage;