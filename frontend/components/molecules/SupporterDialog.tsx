"use client";

import SidebarDialog, {
  SidebarDialogRoot,
  SidebarDialogTrigger,
} from "@/components/molecules/SidebarDialog";
import Profile from "./Profile";
import CardIcon from "./CardIcon";
import { useState } from "react";

interface SupporterDialogProps {
  trigger?: React.ReactNode;
  userId?: string;
}
export default function SupporterDialog({
  trigger,
  userId,
}: SupporterDialogProps) {
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
            className="bg-gray-50 border border-gray-200"
            onClick={handleOpen}
          />
          <div className="mt-20">
            <Profile
              user={{
                name: "TheHitmaker",
                photo: "/profiles/profile1.png",
                date: "Manziolivier250@gmail.com",
              }}
            />

            <p className="text-[#475569] mt-4 mx-w-[382px] p-4">
              Hey TheBen, thank your for all the hits after hits, we stan you!
            </p>

            <div className="h-0.5 w-[273px] mx-auto bg-gray-200 my-16"></div>

            <div className="flex flex-col gap-4">
              <h3 className="text-gray-800 text-base font-medium">
                Payment details
              </h3>
              <div className="flex text-base font-normal text-gray-600 justify-between">
                <p className="text-gray-400">Amount</p>
                <p>RWF 50,000</p>
              </div>

              <div className="flex text-base font-normal text-gray-600 justify-between">
                <p className="text-gray-400">Payment fee</p>
                <p>RWF 100</p>
              </div>

              <div className="flex text-base font-normal text-gray-600 justify-between">
                <p className="text-gray-400">Transaction ID</p>
                <p>pi_3OkP1XJEtINljGAa0H3Xlm5E</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarDialog>
    </SidebarDialogRoot>
  );
}
