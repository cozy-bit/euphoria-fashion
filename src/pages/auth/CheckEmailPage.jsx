import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import AuthLayout from "./AuthLayout";

export default function CheckEmailPage() {
  const navigate = useNavigate();

  const resendCode = () => {
    localStorage.setItem("resetCode", "0757");
  };

  return (
    <AuthLayout>
      <h1 className="text-[34px] font-bold">
        Check Email
      </h1>

      <p className="mt-5 max-w-[580px] text-[16px] leading-[1.45] text-[#858585]">
        Please check your email inbox and click on the
        provided link to reset your password. If you don’t
        receive email,{" "}
        <button
          onClick={resendCode}
          className="font-medium text-[#8b35f5]"
        >
          Click here to resend
        </button>
      </p>

      <motion.button
        whileHover={{ x: 3 }}
        onClick={() => navigate("/signin")}
        className="mt-8 text-[15px] text-[#666]"
      >
        ‹ &nbsp; Back to{" "}
        <span className="underline">
          Login
        </span>
      </motion.button>

      <button
        onClick={() => navigate("/verification")}
        className="mt-8 block text-[15px] text-[#8b35f5] underline"
      >
        Continue to verification
      </button>
    </AuthLayout>
  );
}