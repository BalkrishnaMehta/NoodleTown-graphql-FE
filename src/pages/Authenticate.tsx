import { useState } from "react";
import styles from "../styles/Forms/Authentication.module.css";
import Login from "../components/forms/Login";
import SignUp from "../components/forms/SignUp";
import { motion, AnimatePresence } from "framer-motion";
import { OutlineButton } from "../components/UI/Button";

const Authenticate = () => {
  const [isLogin, setIsLogin] = useState(true);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <div className={`row justify-center align-center ${styles.auth_container}`}>
      <motion.div
        className={styles.auth_box}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <div className={styles.toggle_container}>
          <div className="my-2 row justify-center gap-1">
            <div className="col align-center">
              <OutlineButton
                className={styles.toggle_btn}
                onClick={() => setIsLogin(true)}>
                Login
              </OutlineButton>
              {isLogin && (
                <motion.div
                  layoutId="tab-indicator"
                  className={styles.active_tab_indicator}
                />
              )}
            </div>
            <div className="col align-center">
              <OutlineButton
                className={styles.toggle_btn}
                onClick={() => setIsLogin(false)}>
                Sign Up
              </OutlineButton>
              {!isLogin && (
                <motion.div
                  layoutId="tab-indicator"
                  className={styles.active_tab_indicator}
                />
              )}
            </div>
          </div>
          <motion.div
            className={styles.toggle_indicator}
            initial={false}
            animate={{
              x: isLogin ? "0%" : "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}>
            {isLogin ? <Login /> : <SignUp />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Authenticate;
