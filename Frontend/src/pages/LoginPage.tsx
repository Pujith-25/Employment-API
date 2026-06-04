import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser }
from "../services/auth.service";

const LoginPage = () => {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const data =
        await loginUser({
          username,
          password
        });

      localStorage.setItem(
        "token",
        data.accessToken
      );

      localStorage.setItem(
        "username",
        data.user.username
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      if (
        data.user.role === "ADMIN"
      ) {
        navigate("/admin");
      } else if (
        data.user.role === "MANAGER"
      ) {
        navigate("/manager");
      } else {
        navigate("/salesman");
      }

    } catch {

      setError(
        "Invalid Credentials"
      );

    }

  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100"
    >
      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-8
        rounded-lg
        shadow-lg
        w-96"
      >

        <h1
          className="
          text-2xl
          font-bold
          mb-6"
        >
          Car Sales Login
        </h1>

        {error && (
          <p
            className="
            text-red-500
            mb-4"
          >
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="
          border
          p-2
          w-full
          mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
          border
          p-2
          w-full
          mb-4"
        />

        <button
          type="submit"
          className="
          bg-blue-600
          text-white
          p-2
          w-full"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default LoginPage;