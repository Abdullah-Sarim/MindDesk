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
//           Create Account 🚀
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
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password match check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.post("/user/signup", { username, email, password });
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start px-8 md:px-45"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent 40%), linear-gradient(135deg, #667eea, #764ba2, #ff758c)",
      }}
      
    >
      <form
        onSubmit={handleSignup}
        className="bg-white/95 backdrop-blur-lg p-5 md:p-10 rounded-2xl shadow-xl w-full max-w-md transition-shadow duration-300 hover:shadow-2xl"

      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Todo Account🚀
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Signup button */}
        <button className="bg-linear-to-r from-green-500 to-emerald-800 hover:from-green-600 hover:to-emerald-700 text-white w-full p-3 rounded-lg font-semibold transition">
          Signup
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
