import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[9999]"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center relative z-50"
          >
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Are you sure you want to leave?</h2>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center space-x-4 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gray-100 text-gray-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-200 shadow-md"
              >
                Stay
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full hover:from-red-600 hover:to-pink-600 transition-colors duration-200 shadow-md"
              >
                Leave
              </motion.button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LogoutModal

