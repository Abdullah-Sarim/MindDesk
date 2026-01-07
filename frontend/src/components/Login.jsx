import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/user/login", { email, password });
      localStorage.setItem("jwt", data.token);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        "Login failed"
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start px-8 md:px-45 "
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent 40%), linear-gradient(135deg, #667eea, #764ba2, #ff758c)",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white/95 backdrop-blur-lg p-5 md:p-10 rounded-2xl shadow-xl w-full max-w-md transition-shadow duration-300 hover:shadow-2xl"

      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome To Your Todo
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        {/* Password with show/hide */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Login button */}
        <button className="bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white w-full p-3 rounded-lg font-semibold transition">
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          New user?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
