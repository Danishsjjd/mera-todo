import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";

export default function IconButton({ loading, Icon, onClick }) {
  return (
    <button onClick={onClick}>
      <motion.span
        style={{
          display: "block",
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, .0)",
          cursor: "pointer",
          padding: 2,
        }}
        animate={{
          scale: loading ? 0.8 : 1,
          backgroundColor: loading
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(255, 255, 255, .0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon className={loading ? "absolute" : "relative"} loading={loading} />

        {loading && (
          <div className="relative inset-0 grid place-items-center">
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              visible={true}
              width={40}
            />
          </div>
        )}
      </motion.span>
    </button>
  );
}
