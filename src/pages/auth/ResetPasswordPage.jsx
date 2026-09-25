import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import AuthLayout from "./AuthLayout";

const USERS_KEY = "users";
const RESET_EMAIL_KEY = "resetEmail";
const RESET_CODE_KEY = "resetCode";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (!user) {
      setError("We can not find your email.");
      return;
    }

    localStorage.setItem(RESET_EMAIL_KEY, email);

    // Код для локальной демонстрации
    localStorage.setItem(RESET_CODE_KEY, "0757");

    navigate("/check-email");
  };

  return (
    <AuthLayout>
      <h1 className="text-[34px] font-bold">
        Reset Your Password
      </h1>

      <p className="mt-2 text-[16px] text-[#777]">
        Enter your email and we'll send you a link to reset
        your password.
      </p>

      <p className="mt-1 text-[15px] text-[#888]">
        Please check it.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8"
      >
        <label className="text-[17px]">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="focus001@gmail.com"
          className={`mt-2 h-[55px] w-full rounded-[8px] border px-5 text-[16px] outline-none ${
            error
              ? "border-[#8b35f5]"
              : "border-[#444]"
          } focus:border-[#8b35f5]`}
        />

        {error && (
          <p className="mt-3 text-[14px] text-[#d83a62]">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-8 h-[55px] w-[166px] rounded-[7px] bg-[#8b35f5] text-white"
        >
          Send
        </motion.button>
      </form>

      <p className="mt-3 text-[15px]">
        Back to{" "}
        <Link
          to="/signin"
          className="underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}