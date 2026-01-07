import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex h-screen flex-col items-center justify-center text-center px-4"
      style={{
        background: "linear-gradient(to right, #f9a8d4, #c084fc, #818cf8)",
      }}
    >
      {/* <div className="flex h-screen flex-col items-center justify-center bg-pink-300 text-center px-4">
       */}
      <div className="text-6xl md:text-8xl font-extrabold text-white animate-pulse mb-4">
        404
      </div>

      <div className="text-2xl md:text-3xl font-semibold text-white mb-2">
        Page Not Found
      </div>

      <p className="text-white/90 text-sm md:text-base mb-6">
        You’ll be redirected to the home page in 5 seconds.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-600 hover:text-white transition duration-300"
      >
        Go Home
      </button>
    </div>
  );
}

export default PageNotFound;
