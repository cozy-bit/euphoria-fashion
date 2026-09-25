import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

import AuthLayout from "./AuthLayout";
import { registerUser } from "../../utils/authStorage";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [agree, setAgree] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password =
        "Use 8 or more characters with a mix of letters, numbers & symbols";
    }

    if (!agree) {
      newErrors.agree = "Please accept Terms of use.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = registerUser(email, password);

    if (!result.success) {
      setErrors({
        email: result.message,
      });

      return;
    }

    // После регистрации сразу на главную
    navigate("/");
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <h1 className="text-[38px] sm:text-[42px] font-semibold leading-tight mb-2">
          Sign Up
        </h1>

        <p className="text-[#777] text-[16px] mb-11">
          Sign up for free to access to in any of our products
        </p>

        {/* GOOGLE */}
        <button
          type="button"
          className="w-full h-[62px] border border-[#555] rounded-[8px] flex items-center justify-center gap-4 text-[#8d32ff] text-[19px] hover:border-[#8d32ff] transition"
        >
          <GoogleIcon sx={{ color: "#4285F4" }} />
          Continue With Google
        </button>

        {/* TWITTER */}
        <button
          type="button"
          className="w-full h-[62px] border border-[#555] rounded-[8px] flex items-center justify-center gap-4 text-[#8d32ff] text-[19px] mt-4 hover:border-[#8d32ff] transition"
        >
          <span className="text-[#42a5df] font-bold">
            ♥
          </span>
          Continue With Twitter
        </button>

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

          {/* EMAIL */}
          <label className="block text-[17px] mb-3">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              setErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }}
            placeholder="designer@gmail.com"
            className={`w-full h-[54px] rounded-[8px] border px-5 outline-none text-[16px] transition
              ${
                errors.email
                  ? "border-[#ff3860]"
                  : "border-[#555] focus:border-[#8d32ff]"
              }
            `}
          />

          {errors.email && (
            <p className="text-[#ff3860] text-[14px] mt-2">
              {errors.email}
            </p>
          )}

          {/* PASSWORD */}
          <div className="mt-8">

            <div className="flex justify-between items-center mb-3">
              <label className="text-[17px]">
                Password
              </label>

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
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                }));
              }}
              className={`w-full h-[54px] rounded-[8px] border px-5 outline-none text-[16px]
                ${
                  errors.password
                    ? "border-[#ff3860]"
                    : "border-[#555] focus:border-[#8d32ff]"
                }
              `}
            />

            {errors.password ? (
              <p className="text-[#777] text-[14px] mt-2">
                {errors.password}
              </p>
            ) : (
              <p className="text-[#777] text-[14px] mt-2">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
            )}

          </div>

          {/* TERMS */}
          <label className="flex items-center gap-3 mt-8 cursor-pointer text-[#777]">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) =>
                setAgree(e.target.checked)
              }
              className="w-[18px] h-[18px] accent-[#555]"
            />

            <span>
              Agree to our{" "}
              <u>Terms of use</u> and{" "}
              <u>Privacy Policy</u>
            </span>
          </label>

          {/* NEWSLETTER */}
          <label className="flex items-center gap-3 mt-5 cursor-pointer text-[#777]">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) =>
                setNewsletter(e.target.checked)
              }
              className="w-[18px] h-[18px] accent-[#555]"
            />

            <span>
              Subscribe to our monthly newsletter
            </span>
          </label>

          {/* BUTTON */}
          <button
            type="submit"
            className="mt-8 h-[54px] px-12 bg-[#8d32ff] text-white rounded-[7px] text-[17px] hover:bg-[#7620e5] transition"
          >
            Sign Up
          </button>

          {/* LOGIN */}
          <p className="text-[#777] mt-3">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="underline text-[#555]"
            >
              Log in
            </Link>
          </p>

        </form>
      </motion.div>
    </AuthLayout>
  );
}