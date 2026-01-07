// import Button from "./Button";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
//   const navigate = useNavigate();
//   if (!isOpen) return null;

//   const logout = async () => {

//     if (!onConfirm) return;

//     try {
//       await api.get("/user/logout");
//       localStorage.removeItem("jwt");
//       toast.success("Logged out");
//       navigate("/login");
//     } catch {
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
//       <div className="bg-white p-6 m-5 rounded-lg w-96 animate-scaleIn">
//         <div className="flex justify-between items-center mb-3">
//         <h2 className="text-xl text-red-500 font-semibold">{title}</h2>

//         <Button
//           variant="primary"
//           onClick={onCancel}
//           className={`px-2 py-1 bg-transparent`}
//           >
//             ✖
//           </Button>

//         </div>
//         <p className="mt-2 text-gray-600">{message}</p>
//         <div className="flex justify-end gap-3 mt-6">
//           <Button
//             variant="primary"
//             onClick={onCancel}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="danger"
//             onClick={logout}
//             >
//             Confirm
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmModal;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

import Button from "./Button";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger", // danger | primary
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
      <div className="bg-white p-6 m-5 rounded-lg w-96 animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-red-500">{title}</h2>

          <Button variant="ghost" onClick={onCancel} className="px-2 py-1">
            ✖
          </Button>
        </div>

        {/* Message */}
        <p className="mt-2 text-gray-600">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="primary" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button variant={variant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

// export default ConfirmModal;

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

const DeleteConfirmButton = ({
  title = "Delete",
  message = "Are you sure you want to delete this item?",
  onDelete,
  buttonText = "Delete",
  buttonVariant = "delete",
  confirmText = "Delete",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onDelete();
    setOpen(false);
  };

  return (
    <>
      {/* Delete Button */}
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
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export { LogoutConfirmButton,
        DeleteConfirmButton,
        ConfirmModal 
      };
