"use client";

import SidebarDialog, {
  SidebarDialogRoot,
  SidebarDialogTrigger,
} from "@/components/molecules/SidebarDialog";
import Profile from "./Profile";
import CardIcon from "./CardIcon";
import { useState } from "react";
import ChangeCreatorStatus from "./ChangeCreatorStatus";

interface CreatorDialogProps {
  trigger?: React.ReactNode;
  userId?: string;
}
export default function CreatorDialog({ trigger, userId }: CreatorDialogProps) {
  const [open, setOpen] = useState(false);
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
              user={{
                name: "TheHitmaker",
                photo: "/profiles/profile1.png",
                date: "Manziolivier250@gmail.com",
              }}
            />

            <div className="max-w-[476px]">
              <h3 className="text-sm text-gray-400 uppercase">Bio</h3>
              <p className="text-[#475569] mt-0.5">
                Hey, I&apos;m Rafael a product designer on a mission to create
                tech magic! I whip up interfaces that people adore and sprinkle
                pixel-perfect details everywhere
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <CardIcon
                icon="instagram"
                className="bg-gray-50 border border-gray-200"
              />
              <CardIcon
                icon="snapchat"
                className="bg-gray-50 border border-gray-200"
              />
              <CardIcon
                icon="tiktok"
                className="bg-gray-50 border border-gray-200"
              />
              <CardIcon
                icon="x"
                className="bg-gray-50 border border-gray-200"
                fill="#4B5563"
                stroke="#4B5563"
                width={20}
                height={20}
              />
              <CardIcon
                icon="more-horizontal"
                className="bg-gray-50 border border-gray-200"
              />
            </div>

            <div className="flex gap-2.5">
              <ChangeCreatorStatus
                className="w-full"
                trigger={
                  <button className="bg-[#34D399] w-full  flex-grow border text-center border-[#34D399] text-white font-normal rounded-md px-4 py-2 text-sm">
                    Approve
                  </button>
                }
                newStatus="approved"
                userId="1"
              />

              <ChangeCreatorStatus
                className="w-full"
                trigger={
                  <button className="bg-gray-50 w-full flex-grow border text-center border-gray-200 text-[#0000008A] font-normal rounded-md px-4 py-2 text-sm">
                    Reject
                  </button>
                }
                newStatus="rejected"
                userId="1"
              />
            </div>
          </div>
        </div>
      </SidebarDialog>
    </SidebarDialogRoot>
  );
}
