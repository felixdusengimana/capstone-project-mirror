"use client";

import SidebarDialog, {
  SidebarDialogRoot,
  SidebarDialogTrigger,
} from "@/components/molecules/SidebarDialog";
import Profile from "./Profile";
import CardIcon from "./CardIcon";
import { useState } from "react";
import ChangeCreatorStatus from "./ChangeCreatorStatus";
import { EApprovalStatus } from "@/types";
import { useGetCreator } from "@/services/users";
import { IconNames } from "../atoms/Icon";

interface CreatorDialogProps {
  trigger?: React.ReactNode;
  userId: string;
}
export default function CreatorDialog({ trigger, userId }: CreatorDialogProps) {
  const [open, setOpen] = useState(false);
  const { data: creator, isPending } = useGetCreator(userId!);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <SidebarDialogRoot open={open} onOpenChange={handleOpen}>
      <SidebarDialogTrigger className="w-full">{trigger}</SidebarDialogTrigger>
      <SidebarDialog>
        <div className="p-12">
          <CardIcon
            icon="close"
            className="bg-gray-50 border border-gray-200 w-10 h-10"
            onClick={handleOpen}
          />
          <div className="mt-20 flex flex-col gap-4">
            <Profile
              isUserLoading={isPending}
              user={{
                name: creator?.data?.name ?? "",
                photo: creator?.data?.profileImageUrl ?? "",
                date: creator?.data?.username,
              }}
            />

            <div className="max-w-[476px]">
              <h3 className="text-sm text-gray-400 uppercase">Bio</h3>
              <p className="text-[#475569] mt-0.5">{creator?.data?.bio}</p>
            </div>

            <div className="flex gap-3 items-center">
              {creator?.data.socialLinks?.map((link, index) => (
                <CardIcon
                  key={index}
                  link={link.link}
                  icon={
                    (link.platform.toLocaleLowerCase() as IconNames) ?? "alt"
                  }
                  className="bg-gray-50 border border-gray-200"
                />
              ))}
            </div>

            <div className="flex gap-2.5">
              <ChangeCreatorStatus
                className="w-full"
                trigger={
                  <button className="bg-[#34D399] w-full  flex-grow border text-center border-[#34D399] text-white font-normal rounded-md px-4 py-2 text-sm">
                    Approve
                  </button>
                }
                newStatus={EApprovalStatus.APPROVED}
                userId={userId}
              />

              <ChangeCreatorStatus
                className="w-full"
                trigger={
                  <button className="bg-gray-50 w-full flex-grow border text-center border-gray-200 text-[#0000008A] font-normal rounded-md px-4 py-2 text-sm">
                    Reject
                  </button>
                }
                newStatus={EApprovalStatus.REJECTED}
                userId={userId}
              />
            </div>
          </div>
        </div>
      </SidebarDialog>
    </SidebarDialogRoot>
  );
}
