import { useEffect } from "react";
import { motion } from "motion/react";

type Props = {
  onFinish: () => void;
};

export default function AppSplash({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="mb-4 flex h-22 w-22 items-center justify-center rounded-3xl bg-white"
          initial={{ scale: 12, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        >
          <motion.span
            className="text-3xl font-extrabold text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.3 }}
          >
            GF
          </motion.span>
        </motion.div>

        <motion.p
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          Gymflow
        </motion.p>
      </div>
    </motion.div>
  );
}