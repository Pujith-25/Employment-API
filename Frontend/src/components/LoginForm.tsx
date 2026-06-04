import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

const LoginForm = () => {

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
        await login({
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
        "Invalid Credentials"
      );

    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      bg-white
      p-8
      rounded
      shadow-md
      w-96"
    >
      <h1
        className="
        text-2xl
        font-bold
        mb-6"
      >
        Employee Login
      </h1>

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <input
        type="email"
        placeholder="Email"
        className="
        border
        p-2
        w-full
        mb-4"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="
        border
        p-2
        w-full
        mb-4"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
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
  );

};

export default LoginForm;