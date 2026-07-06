import * as DialogPrimitives from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

const SidebarDialogTrigger = DialogPrimitives.Trigger;
const SidebarDialogRoot = DialogPrimitives.Root;

export interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  titleClassName?: string;
  children: React.ReactNode;
  className?: string;
  location?: "left" | "right";
}

export default function SidebarDialog({
  title,
  titleClassName,
  children,
  className,
  location = "right",
  ...rest
}: DialogProps) {
  return (
    <DialogPrimitives.Portal>
      <motion.div
        className={`fixed inset-0 z-50 flex ${
          location === "right" ? "justify-end" : "justify-start"
        } items-center`}
      >
        <DialogPrimitives.Overlay className="fixed inset-0 z-50 bg-black/40 bg-blend-overlay transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <motion.div
          initial={{ opacity: 0, [location]: "-1000px" }}
          animate={{ opacity: 1, [location]: 0 }}
          exit={{ opacity: 0, y: 1000 }}
          transition={{
            delay: 0.1,
          }}
          className={`relative h-screen w-[499px] scrollbar-thin scrollbar-thumb-[#c0c0c0]
       scrollbar-track-gray-50 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg z-50 grid gap-4 overflow-y-auto border bg-white shadow-lg ${className}`}
          style={{ maxWidth: "90%" }}
        >
          <DialogPrimitives.Content>{children}</DialogPrimitives.Content>
        </motion.div>
      </motion.div>
    </DialogPrimitives.Portal>
  );
}

export { SidebarDialogTrigger, SidebarDialogRoot };
