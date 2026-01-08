// import { useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// function Signup() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       await api.post("/user/signup", { username, email, password });
//       toast.success("Signup successful");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-start px-6 md:px-95"
      // style={{
      //   background:
      //     "radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent 40%), linear-gradient(135deg, #34d399, #14b8a6, #3b82f6)",
      // }}
//     >
//       <form
//         onSubmit={handleSignup}
//         className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform duration-300 hover:scale-[1.02]"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Create Account 
//         </h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           required
//           onChange={(e) => setUsername(e.target.value)}
//           className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//         />

//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//         />

//         <button className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white w-full p-3 rounded-lg font-semibold transition">
//           Signup
//         </button>

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signup;

import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function Signup({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.post("/user/signup", { username, email, password });
      toast.success("Signup successful");
      onSwitchToLogin(); // 🔁 SWITCH BACK TO LOGIN
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-3">
      <h2 className="md:hidden text-3xl text-center font-bold text-white mb-2">
            MindDesk
          </h2>
      <h2 className="text-2xl font-bold text-center text-white">
        Create Your Account
      </h2>
      <p className="text-[12px] text-center text-white">Your task, notes and focus-all in one place. <br />
        Start organizing your Ideas and Goals today.
      </p>

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
        className="bg-transparent border-b-2 rounded-2xl border-white p-2 text-white focus:outline-none focus:border-cyan-400"
      />

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

      {/* Confirm Password */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="bg-transparent border-b-2 rounded-2xl border-white p-2 text-white focus:outline-none focus:border-cyan-400"
      />

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 border-2 text-white border-cyan-400 rounded-full py-2 font-semibold hover:bg-cyan-400/20 transition"
      >
        Signup
      </button>

      {/* SWITCH (IMPORTANT) */}
      <p className="text-sm text-center text-gray-300 mt-2">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-cyan-400 underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default Signup;
