import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Icon from "../atoms/Icon";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApproveCreator } from "@/services/users";
import toast from "react-hot-toast";
import { EApprovalStatus } from "@/types";
import { useTranslations } from "next-intl";

interface ChangeCreatorStatusProps {
  newStatus: EApprovalStatus;
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
  const t = useTranslations("components");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      ApproveCreator({
        creatorId: userId,
        approvalStatus: newStatus,
      }),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["creators"],
      });
      toast.success(t("approve"));
    },
    onError: () => toast.error(t("genericError")),
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogRoot onOpenChange={setOpen} open={open}>
      <DialogTrigger className={className}>{trigger}</DialogTrigger>
      <Dialog
        preventCloseOnClickOutside={isPending}
        className="pt-4 min-w-[443px]"
      >
        <div className="w-full py-6">
          <div className="flex items-center justify-between px-6">
            <h1 className="text-[#000000] font-medium text-lg ">
              {t("changeStatus")}
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
              {t("statusConfirm", {status: newStatus === EApprovalStatus.APPROVED ? t("approve") : t("reject")})}
            </p>
            <div className="w-fit ml-auto flex gap-2.5 mt-6">
              <button
                onClick={() => mutate()}
                disabled={isPending}
                className={`${
                  newStatus === EApprovalStatus.APPROVED
                    ? "bg-[#34D399] border-[#34D399]"
                    : "bg-[#EF4444] border-[#EF4444]"
                } flex gap-1 items-center flex-grow border text-center text-white font-normal rounded-md px-4 py-2 text-sm`}
              >
                {isPending && (
                  <div className="w-3 h-3 rounded-full border border-t-0 border-gray-200 animate-spin"></div>
                )}
                {newStatus === EApprovalStatus.APPROVED ? t("approve") : t("reject")}
              </button>

              <button
                disabled={isPending}
                onClick={handleClose}
                className="bg-gray-50 flex-grow border text-center border-gray-200 text-[#0000008A] font-normal rounded-md px-4 py-2 text-sm"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
