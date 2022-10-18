import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

const TickIcon = ({ loading, className }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.9], [0, 1]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 150 150"
      width={45}
      height={45}
    >
      <motion.path
        d="M38 74.707l24.647 24.646L116.5 45.5"
        fill="transparent"
        strokeWidth="20"
        stroke="#39e"
        strokeLinecap="round"
        initial={{ pathLength: 0.9, opacity: 1 }}
        animate={{ pathLength: loading ? 0 : 0.9 }}
        style={{ pathLength, opacity }}
      />
    </svg>
  );
};

export default TickIcon;
