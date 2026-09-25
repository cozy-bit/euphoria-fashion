import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import AuthLayout from "./AuthLayout";

export default function VerificationPage() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedCode =
      localStorage.getItem("resetCode") || "0757";

    if (code !== savedCode) {
      setError("Invalid verification code.");
      return;
    }

    localStorage.setItem(
      "verificationPassed",
      "true"
    );

    navigate("/create-new-password");
  };

  return (
    <AuthLayout>
      <h1 className="text-[34px] font-bold">
        Verification
      </h1>

      <p className="mt-2 text-[16px] text-[#858585]">
        Verify your code.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-9"
      >
        <label className="text-[17px]">
          Verification Code
        </label>

        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          placeholder="0757"
          maxLength={4}
          className="mt-2 h-[54px] w-full rounded-[8px] border border-[#999] px-5 text-[16px] outline-none focus:border-[#8b35f5]"
        />

        {error && (
          <p className="mt-3 text-[14px] text-red-500">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-8 h-[55px] w-[166px] rounded-[7px] bg-[#8b35f5] text-white"
        >
          Verify Code
        </motion.button>
      </form>
    </AuthLayout>
  );
}