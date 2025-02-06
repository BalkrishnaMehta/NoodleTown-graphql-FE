import { motion } from "framer-motion";
import React from "react";

interface SpinnerProps {
  size?: string;
  color?: string;
  borderThickness?: string;
  classes?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "40px",
  color = "#3498db",
  borderThickness = "4px",
  classes,
}) => {
  return (
    <motion.div
      style={{
        display: "inline-block",
        width: size,
        height: size,
        border: `${borderThickness} solid ${color}`,
        borderTop: `${borderThickness} solid transparent`,
        borderRadius: "50%",
      }}
      className={classes}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
    />
  );
};

export default Spinner;
