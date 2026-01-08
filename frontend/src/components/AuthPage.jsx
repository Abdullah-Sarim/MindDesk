import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode =
  searchParams.get("mode") === "signup" ? "signup" : "signin";

const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "signup") {
      setMode("signup");
    } else {
      setMode("signin");
    }
  }, [searchParams]);

  const switchToSignup = () => {
    setSearchParams({ mode: "signup" });
  };

  const switchToSignin = () => {
    setSearchParams({});
  };

  return (
    <AuthLayout
      loginForm={<Login onSwitchToSignup={switchToSignup} />}
      signupForm={<Signup onSwitchToLogin={switchToSignin} />}
      mode={mode}
    />
  );
}

