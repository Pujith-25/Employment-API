import { useState } from "react";
import { changePassword }
from "../services/profile.service";
import Navbar from "../components/Navbar";

const ChangePasswordPage = () => {

  const [
    currentPassword,
    setCurrentPassword
  ] = useState("");

  const [
    newPassword,
    setNewPassword
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const [
    message,
    setMessage
  ] = useState("");

  const handleSubmit =
    async () => {

      try {

        const data =
          await changePassword(
            currentPassword,
            newPassword,
            confirmPassword
          );

        setMessage(
          data.message
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

      } catch (error: any) {

        setMessage(
          error.response?.data?.message ||
          "Something went wrong"
        );

      }

    };

  return (
<div>
    <Navbar/>

    <div className="p-10">

      <h1
        className="
        text-3xl
        font-bold
        mb-6"
      >
        Change Password
      </h1>

      <div
        className="
        flex
        flex-col
        gap-4
        max-w-md"
      >

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
          className="
          border
          p-2"
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
          p-2"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="
          border
          p-2"
        />

        <button
          onClick={handleSubmit}
          className="
          bg-blue-600
          text-white
          p-2"
        >
          Change Password
        </button>

        {message && (

          <p
            className="
            font-semibold"
          >
            {message}
          </p>

        )}

      </div>

    </div>
</div>
  );

};

export default ChangePasswordPage;