import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export function NoChallenge() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="rounded-full bg-muted p-3 mb-4">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Nothing here yet</h3>
        <p className="text-sm text-muted-foreground">No Challenge found here yet, yippie!</p>
      </motion.div>
    );
  }