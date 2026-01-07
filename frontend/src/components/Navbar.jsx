import { useState, useRef, useEffect } from "react";
import TodoStats from "./charts/TodoStats";
import TodoChart from "./charts/TodoStatsChart";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutConfirmButton } from "./ConfirmModel";

function Navbar({ user, todos }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const linkClass = (path) =>
    `px-3 py-2 rounded text-[12px] sm:text-[15px] transition ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    // <nav className=" top-0 z-40 w-full bg-gray-200 shadow-md px-6 py-3 relative">

    <nav className="sticky top-0 z-50 w-full bg-white/95 shadow mb-2 px-5 py-1 sm:p-2.5">
      {/* Top row */}
      <div className="flex items-center justify-between w-full py-2 px-5">
        {/* LEFT: Logo */}
        <h1 className="text-[18px] sm:text-[24px] font-bold text-blue-600 whitespace-nowrap">
          Todo App
        </h1>

        <div className="flex gap-2 mx-2">
          <button className={linkClass("/")} onClick={() => navigate("/")}>
            Home
          </button>

          <button
            className={linkClass("/todo")}
            onClick={() => navigate("/todo")}
          >
            Todos
          </button>

          <button
            className={linkClass("/notes")}
            onClick={() => navigate("/notes")}
          >
            Notes
          </button>
        </div>

        {/* RIGHT: User info + logout (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <>
              <span className="font-semibold text-gray-700">
                👤 {user.username}
              </span>
              <span className="hidden lg:block text-gray-700">
                {user.email}
              </span>
            </>
          )}

          <LogoutConfirmButton
            buttonText="Sign Out"
            title="Logout"
            message="Do you really want to sign out?"
          />
        </div>

        {/* MOBILE: menu button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden text-2xl text-gray-700 mx-2"
        >
          ☰
        </button>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={`lg:hidden ${
            open ? "absolute" : "hidden"
          } top-full mt-6 w-60 sm:w-75 bg-white rounded-xl shadow-lg p-3 space-y-4 animate-slideDown`}
        >
          {/* User info */}
          {user && (
            <div className="text-gray-700 border-b pb-3">
              <p className="font-semibold">👤 {user.username}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
          )}
          <TodoStats todos={todos} />

          {todos.length > 0 && (
            <TodoChart
              completed={todos.filter((t) => t.completed).length}
              remaining={todos.filter((t) => !t.completed).length}
            />
          )}
          
          <LogoutConfirmButton
            buttonText="Sign Out"
            title="Logout"
            message="Do you really want to sign out?"
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
