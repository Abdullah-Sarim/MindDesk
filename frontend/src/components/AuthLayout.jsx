import { motion } from "framer-motion";

export default function AuthLayout({
  loginForm,
  signupForm,
  mode = "signin",
  loginWelcome = "Build better days with MindDesk",
  signupWelcome = "Build better days with MindDesk",
}) {
  const isSignup = mode === "signup";

  const TRANSITION_DURATION = 1.3;
  const EASING = "easeInOut";

  /* PANEL animation ONLY (safe) */
  const panelVariants = {
    show: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.7, ease: EASING },
    },
    hideLeft: {
      x: "-120%",
      opacity: 0,
      transition: { duration: 0.7, ease: EASING },
    },
    hideRight: {
      x: "120%",
      opacity: 0,
      transition: { duration: 0.7, ease: EASING },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] px-4">
      <div className="relative grid place-items-center w-full max-w-[800px] min-h-[520px] md:h-[500px] border-2 border-cyan-400 rounded-2xl shadow-[0_0_25px_#00d4ff] overflow-hidden">

        {/*BACKGROUND SHAPES (UNCHANGED) */}
        <motion.div
          initial={false}
          animate={{
            rotate: isSignup ? 0 : 11,
            skewY: isSignup ? 0 : 40,
          }}
          transition={{ duration: 1.5, ease: EASING }}
          className="absolute right-0 top-[-5px] h-[700px] w-[900px] bg-gradient-to-br from-[#1a1a2e] to-cyan-500 origin-bottom-right hidden md:block"
        />

        <motion.div
          initial={false}
          animate={{
            rotate: isSignup ? -11 : 0,
            skewY: isSignup ? -41 : 0,
          }}
          transition={{ duration: 1.5, ease: EASING }}
          className="absolute left-[250px] top-full h-[700px] w-[900px] bg-[#1a1a2e] border-t-4 border-cyan-400 origin-bottom-left hidden md:block"
        />

        {/*LOGIN PANEL (VISIBLE) */}
        <motion.div
          initial={false}
          animate={isSignup ? "hideLeft" : "show"}
          variants={panelVariants}
          className="
            col-start-1 row-start-1
            w-full md:w-1/2
            h-full
            z-10
            flex items-center justify-center
            px-6 md:px-10
            md:absolute md:left-0
          "
        >
          {loginForm}
        </motion.div>

        {/*SIGNUP PANEL (VISIBLE) */}
        <motion.div
          initial={false}
          animate={isSignup ? "show" : "hideRight"}
          variants={panelVariants}
          className="
            col-start-1 row-start-1
            w-full md:w-1/2
            h-full
            z-10
            flex items-center justify-center
            px-6 md:px-10
            md:absolute md:right-0
          "
        >
        
          {signupForm}
        </motion.div>

        {/*WELCOME TEXT (DESKTOP ONLY) */}
        <motion.div
          initial={false}
          animate={{ x: isSignup ? "120%" : 0, opacity: isSignup ? 0 : 1 }}
          transition={{ duration: 0.7, ease: EASING }}
          className="hidden md:flex absolute right-0 w-1/2 h-full items-center justify-center text-right px-10 pb-35 pointer-events-none"
        >
          <h2 className="text-4xl font-bold text-white">
            {loginWelcome}
          </h2>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ x: isSignup ? 0 : "-120%", opacity: isSignup ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASING }}
          className="hidden md:flex absolute left-0 w-1/2 h-full items-center justify-center text-left px-10 pb-30 pointer-events-none"
        >
          <h2 className="text-4xl font-bold text-white">
            {signupWelcome}
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
