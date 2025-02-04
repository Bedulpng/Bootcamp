import { motion } from "framer-motion";

export default function ClassesPageSkeleton() {
  return (
    <div className="grid gap-6 p-4">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: i * 0.3 }}
          className="w-80 rounded-lg border bg-white shadow-md"
        >
          {/* Header */}
          <div className="h-16 rounded-t-lg bg-gray-200" />

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-gray-200" />

              {/* Title and Subtitle */}
              <div className="flex flex-col space-y-2">
                <div className="h-6 w-36 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 h-6 w-1/2 rounded bg-gray-200" />
          </div>

          {/* Actions */}
          <div className="flex justify-between border-t p-4">
            <div className="h-6 w-10 rounded bg-gray-200" />
            <div className="h-6 w-10 rounded bg-gray-200" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
