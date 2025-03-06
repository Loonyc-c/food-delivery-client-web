import { motion } from "framer-motion";

const InfiniteTextSlider = () => {
  return (
    <div className="w-screen overflow-hidden bg-[#EF4444] text-white py-4 " >
      <motion.div
        className="flex space-x-10 text-2xl font-bold whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="px-4 text-[30px]">
            Fresh Fast Delivered
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteTextSlider;