import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

const LoginPage = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
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
          email,
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

      navigate("/home");

    } catch {

      setError(
        "Invalid Email or Password"
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
          mb-6
          text-center"
        >
          Employee Login
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
          border
          w-full
          p-2
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
          w-full
          p-2
          mb-4"
        />

        <button
          type="submit"
          className="
          bg-blue-600
          text-white
          w-full
          p-2
          rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );

};

export default LoginPage;