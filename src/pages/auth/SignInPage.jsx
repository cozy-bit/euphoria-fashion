import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

import AuthLayout from "./AuthLayout";
import { loginUser } from "../../utils/authStorage";

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <h1 className="text-[38px] sm:text-[42px] font-semibold mb-11">
          Sign In Page
        </h1>

        <button
          type="button"
          className="w-full h-[62px] border border-[#555] rounded-[8px] flex items-center justify-center gap-4 text-[#8d32ff] text-[19px]"
        >
          <GoogleIcon sx={{ color: "#4285F4" }} />
          Continue With Google
        </button>

        <button
          type="button"
          className="w-full h-[62px] border border-[#555] rounded-[8px] flex items-center justify-center gap-4 text-[#8d32ff] text-[19px] mt-4"
        >
          <span className="text-[#42a5df] font-bold">
            ♥
          </span>
          Continue With Twitter
        </button>

        <div className="flex items-center gap-5 my-12">
          <div className="h-[1px] bg-[#ddd] flex-1" />
          <span className="text-[#777]">OR</span>
          <div className="h-[1px] bg-[#ddd] flex-1" />
        </div>

        <form onSubmit={handleSubmit}>

          <label className="block mb-3">
            User name or email address
          </label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[58px] border border-[#555] rounded-[8px] px-5 outline-none focus:border-[#8d32ff]"
          />

          <div className="mt-8">

            <div className="flex justify-between mb-3">
              <label>Password</label>

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="flex items-center gap-2 text-[#777]"
              >
                {showPassword ? (
                  <VisibilityOffIcon sx={{ fontSize: 19 }} />
                ) : (
                  <VisibilityIcon sx={{ fontSize: 19 }} />
                )}

                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[58px] border border-[#555] rounded-[8px] px-5 outline-none focus:border-[#8d32ff]"
            />

          </div>

          <div className="flex justify-end mt-4">
            <Link
              to="/reset-password"
              className="underline text-[#555]"
            >
              Forget your password
            </Link>
          </div>

          {error && (
            <p className="text-[#ff3860] mt-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-7 h-[54px] px-12 bg-[#8d32ff] text-white rounded-[7px] text-[17px]"
          >
            Sign In
          </button>

          <p className="mt-3 text-[#777]">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="underline text-[#555]"
            >
              Sign up
            </Link>
          </p>

        </form>
      </motion.div>
    </AuthLayout>
  );
}