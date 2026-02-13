import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Icon from "../atoms/Icon";
import { useState } from "react";

interface ChangeCreatorStatusProps {
  newStatus: "approved" | "rejected";
  userId: string;
  trigger: React.ReactNode;
  className?: string;
}

export default function ChangeCreatorStatus({
  newStatus,
  userId,
  trigger,
  className,
}: ChangeCreatorStatusProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogRoot onOpenChange={setOpen} open={open}>
      <DialogTrigger className={className}>{trigger}</DialogTrigger>
      <Dialog className="pt-4 min-w-full lg:min-w-[443px]">
        <div className="w-full py-6">
          <div className="flex items-center justify-between px-6">
            <h1 className="text-[#000000] font-medium text-lg ">
              Change Creator Status
            </h1>
            <Icon
              name="close"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </div>
          {/* divider */}
          <div className="bg-[#E5E9F0] h-[1px] w-full my-6"></div>
          <div className="px-6">
            <p className="text-[#4D5E80]">
              Are you sure you want to {newStatus} this user.{" "}
            </p>
            <div className="w-fit ml-auto flex gap-2.5 mt-6">
              <button
                className={`${
                  newStatus === "approved"
                    ? "bg-[#34D399] border-[#34D399]"
                    : "bg-[#EF4444] border-[#EF4444]"
                } flex-grow border text-center text-white font-normal rounded-md px-4 py-2 text-sm`}
              >
                Approve
              </button>

              <button
                onClick={handleClose}
                className="bg-gray-50 flex-grow border text-center border-gray-200 text-[#0000008A] font-normal rounded-md px-4 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
