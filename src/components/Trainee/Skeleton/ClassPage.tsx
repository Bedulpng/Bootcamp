import { motion } from "framer-motion";

export default function ClassesPageSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: i * 0.3 }}
          className="flex animate-pulse items-start gap-4 rounded-lg border p-4"
        >
          <div className="h-24 w-24 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-4 w-1/4 rounded bg-gray-200" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
