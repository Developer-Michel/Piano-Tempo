"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const HeroBottom = () => {
  return (
    <>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
      >
        <ArrowDown
          className=" bottom-1 left-1/2 -translate-x-1/2"
          color="gray"
          size={"35"}
        ></ArrowDown>
      </motion.div>
    </>
  );
};
