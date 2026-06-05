import { useState } from "react";

import {
  resetPassword
} from "../services/password.service";

const ResetPasswordPage = () => {

  const [resetToken,
    setResetToken] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const handleResetPassword =
    async () => {

      const data =
        await resetPassword(
          resetToken,
          newPassword
        );

      alert(
        data.message
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
        Reset Password
      </h1>

      <input
        type="text"
        placeholder="Reset Token"
        value={resetToken}
        onChange={(e) =>
          setResetToken(
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
        placeholder="New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(
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
          handleResetPassword
        }
        className="
        bg-green-600
        text-white
        px-4
        py-2"
      >
        Reset Password
      </button>

    </div>

  );

};

export default ResetPasswordPage;