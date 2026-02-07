import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex bg-white">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-grow bg-gray-100 overflow-auto pt-[112px]">
        {children}
      </div>
    </div>
  );
}
