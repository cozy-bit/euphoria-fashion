import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import AuthLayout from "./AuthLayout";

const RESET_EMAIL_KEY = "resetEmail";
const USERS_KEY = "users";

export default function CreateNewPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "New password and confirm new password do not match"
      );
      return;
    }

    const email =
      localStorage.getItem(RESET_EMAIL_KEY);

    if (!email) {
      setError("Reset session expired.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    const userIndex = users.findIndex(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (userIndex === -1) {
      setError("User not found.");
      return;
    }

    users[userIndex].password = password;

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );

    localStorage.removeItem(RESET_EMAIL_KEY);
    localStorage.removeItem("resetCode");
    localStorage.removeItem("verificationPassed");

    navigate("/signin");
  };

  return (
    <AuthLayout>
      <h1 className="text-[34px] font-bold">
        Create New Password
      </h1>

      <p className="mt-2 text-[16px] text-[#858585]">
        Your new password must be different from previous
        used passwords.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-9"
      >
        {/* PASSWORD */}
        <div className="flex items-center justify-between">
          <label className="text-[17px]">
            Password
          </label>

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="text-[#858585]"
          >
            {showPassword ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </button>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="mt-2 h-[54px] w-full rounded-[8px] border border-[#555] px-5 outline-none focus:border-[#8b35f5]"
        />

        <p className="mt-3 text-[14px] text-[#858585]">
          Must be at least 8 characters.
        </p>

        {/* CONFIRM */}
        <div className="mt-8 flex items-center justify-between">
          <label className="text-[17px]">
            Confirm Password
          </label>

          <button
            type="button"
            onClick={() =>
              setShowConfirm(!showConfirm)
            }
            className="text-[#858585]"
          >
            {showConfirm ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </button>
        </div>

        <input
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          className="mt-2 h-[58px] w-full rounded-[8px] border border-[#555] px-5 outline-none focus:border-[#8b35f5]"
        />

        {error && (
          <p className="mt-3 text-[14px] text-[#d62f2f]">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-8 h-[55px] w-[166px] rounded-[7px] bg-[#8b35f5] text-white"
        >
          Reset Password
        </motion.button>
      </form>
    </AuthLayout>
  );
}