import { useState } from "react";
import { forgotPassword }
from "../services/password.service";

const ForgotPasswordPage = () => {

  const [username,
    setUsername] =
    useState("");

  const [token,
    setToken] =
    useState("");

  const handleForgotPassword =
    async () => {

      const data =
        await forgotPassword(
          username
        );

      setToken(
        data.resetToken
      );
    };

  return (

    <div className="p-10">

      <h1
        className="
        text-3xl
        font-bold
        mb-5"
      >
        Forgot Password
      </h1>

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

      <button
        onClick={
          handleForgotPassword
        }
        className="
        bg-blue-600
        text-white
        px-4
        py-2"
      >
        Generate Token
      </button>

      {token && (

        <div
          className="
          mt-4"
        >

          <p>
            Reset Token:
          </p>

          <p
            className="
            font-bold
            break-all"
          >
            {token}
          </p>

        </div>

      )}

    </div>

  );

};

export default ForgotPasswordPage;