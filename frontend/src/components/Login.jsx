import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/user/login", { email, password });
      localStorage.setItem("jwt", data.token);
      toast.success("Login successful");
      window.location.href = "/"; // or navigate("/") if injected
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4"
    >
      <h2 className="md:hidden text-3xl text-center font-bold text-white mb-3">
            MindDesk
          </h2>
      <h2 className=" text-2xl font-semibold md:font-bold text-center text-white">
        Back To Your Desk
      </h2>
      <p className="text-[13px] text-center text-white mb-3">
        Where thoughts turn into action. <br />
        Let's get back to what matters today.
      </p>

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="bg-transparent border-b-2 rounded-2xl border-white p-2 text-white focus:outline-none focus:border-cyan-400"
      />

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border-b-2 rounded-2xl border-white p-2 w-full text-white focus:outline-none focus:border-cyan-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-cyan-300"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 border-2 text-white border-cyan-400 rounded-full py-2 font-semibold hover:bg-cyan-400/20 transition"
      >
        Login
      </button>

      {/* SWITCH (IMPORTANT) */}
      <p className="text-sm text-center text-gray-300 mt-2">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-cyan-400 underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

export default Login;
