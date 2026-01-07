// import { useState } from "react";
// import ConfirmModal from "./ConfirmModel";
// import Button from "./Button";

// const DeleteConfirmButton = ({
//   title = "Delete",
//   message = "Are you sure you want to delete this item?",
//   onDelete,
//   buttonText = "Delete",
//   buttonVariant = "delete",
//   confirmText = "Delete",
//   disabled = false,
// }) => {
//   const [open, setOpen] = useState(false);

//   const handleConfirm = async () => {
//     await onDelete();
//     setOpen(false);
//   };

//   return (
//     <>
//       {/* Delete Button */}
//       <Button
//         variant={buttonVariant}
//         onClick={() => setOpen(true)}
//         disabled={disabled}
//       >
//         {buttonText}
//       </Button>

//       {/* Confirm Modal */}
//       <ConfirmModal
//         isOpen={open}
//         title={title}
//         message={message}
//         confirmText={confirmText}
//         onConfirm={handleConfirm}
//         onCancel={() => setOpen(false)}
//       />
//     </>
//   );
// };

// export default DeleteConfirmButton;
