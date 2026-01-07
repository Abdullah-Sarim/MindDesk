import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModel";
import Button from "./Button";
import api from "../api/axios";
import toast from "react-hot-toast";

const LogoutConfirmButton = ({
  title = "Confirm Logout",
  message = "Are you sure you want to logout?",
  buttonText = "Logout",
  buttonVariant = "danger",
  confirmText = "Logout",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/user/logout");
      localStorage.removeItem("jwt");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Logout Button */}
      <Button
        variant={buttonVariant}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        {buttonText}
      </Button>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={open}
        title={title}
        message={message}
        confirmText={confirmText}
        onConfirm={handleLogout}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default LogoutConfirmButton;
