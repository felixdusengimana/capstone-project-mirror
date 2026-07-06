import * as DialogPrimitives from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import Icon from "../atoms/Icon";

const DialogTrigger = DialogPrimitives.Trigger;
const DialogRoot = DialogPrimitives.Root;

export interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  titleClassName?: string;
  children: React.ReactNode;
  className?: string;
  preventCloseOnClickOutside?: boolean;
  showCloseButton?: boolean;
}

export default function Dialog({
  title,
  titleClassName,
  children,
  className,
  preventCloseOnClickOutside,
  showCloseButton = false,
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
          className={`relative min-w-[calc(100vw-50px)] md:min-w-[600px] scrollbar-thin rounded-lg scrollbar-thumb-[#c0c0c0]
           scrollbar-track-gray-50 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg h-auto z-50 grid gap-4 rounded-b-2xl border bg-white shadow-lg ${className}`}
          style={{ maxWidth: "90%" }}
        >
          <DialogPrimitives.Content
          className=" max-h-[90vh] overflow-y-auto "
            onInteractOutside={(e) => {
              preventCloseOnClickOutside && e.preventDefault();
            }}
          >
                {/* 👇 Optional Close Button */}
            {showCloseButton && (
              <DialogPrimitives.Close className="absolute right-4 top-4">
                <Icon name="close" fill="#FFF" width={30} height={30}/>
              </DialogPrimitives.Close>
            )}

            {/* 👇 Optional Title */}
            {title && (
              <div className={`text-lg font-semibold px-6 pt-6 ${titleClassName}`}>
                {title}
              </div>
            )}

            {children}
          </DialogPrimitives.Content>
        </motion.div>
      </motion.div>
    </DialogPrimitives.Portal>
  );
}

export { DialogTrigger, DialogRoot };
