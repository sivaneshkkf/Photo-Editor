import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const ProgressBar = ({ file, setFile }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timeout = setInterval(() => {
        setProgress((pre) => pre + 1);
      }, 100);
    }

    return () => clearInterval(timeout);
  }, []);
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="h-1 text-white bg-accent1 rounded-full"
    ></motion.div>
  );
};

export default ProgressBar;
