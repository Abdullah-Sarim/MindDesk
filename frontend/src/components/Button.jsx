import { useNavigate } from "react-router-dom";

// Normal Button

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle = " rounded transition ";

  const styles = {
    primary: "px-3 py-2 bg-gray-300 hover:bg-green-500 text-black font-medium",
    danger: "px-3 py-2 bg-gray-300 border-red-300 hover:bg-red-500 font-medium",
    ghost: "px-3 py-2 bg- border-gray-300 hover:bg-blue-400 font-medium",
    delete: "px-2 py-1 bg-transparent hover:bg-red-300",
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Back Button

const BackButton = ({
  to = "/",
  label = "Back",
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className={`flex items-center rounded-lg gap-2 text-md ${className}`}
      onClick={() => navigate(to)}
    >
      ←{label}
    </Button>
  );
};

export { Button, BackButton };
export default Button;
