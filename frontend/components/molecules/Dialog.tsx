import * as DialogPrimitives from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

const DialogTrigger = DialogPrimitives.Trigger;
const DialogRoot = DialogPrimitives.Root;

export interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  titleClassName?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Dialog({
  title,
  titleClassName,
  children,
  className,
  ...rest
}: DialogProps) {
  return (
    <DialogPrimitives.Portal>
      <motion.div className="fixed inset-0 z-50 flex justify-center items-center">
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 bg-blend-overlay transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <motion.div
          initial={{ opacity: 0, bottom: "-1000px" }}
          animate={{ opacity: 1, bottom: 0 }}
          exit={{ opacity: 0, y: 1000 }}
          transition={{
            delay: 0.1,
          }}
          className={`relative max-h-[90vh] min-w-[600px] scrollbar-thin rounded-lg scrollbar-thumb-[#c0c0c0]
           scrollbar-track-gray-50 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg h-auto z-50 grid gap-4 overflow-y-auto rounded-b-2xl border bg-white shadow-lg ${className}`}
          style={{ maxWidth: "90%" }}
        >
          <DialogPrimitives.Content>{children}</DialogPrimitives.Content>
        </motion.div>
      </motion.div>
    </DialogPrimitives.Portal>
  );
}

export { DialogTrigger, DialogRoot };
