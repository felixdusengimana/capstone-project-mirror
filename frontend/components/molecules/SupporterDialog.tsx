"use client";

import SidebarDialog, {
  SidebarDialogRoot,
  SidebarDialogTrigger,
} from "@/components/molecules/SidebarDialog";
import Profile from "./Profile";
import CardIcon from "./CardIcon";
import { useState } from "react";
import { useGetTransactionByReference } from "@/services/transactions";
import { ITransaction } from "@/types/transaction";

interface SupporterDialogProps {
  trigger?: React.ReactNode;
  referenceId: string;
  transaction: ITransaction;
}
export default function SupporterDialog({
  trigger,
  referenceId,
  transaction,
}: SupporterDialogProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  // const { data: transaction } = useGetTransactionByReference(referenceId, open);

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
                name: transaction?.donorName ?? "",
                photo: "",
                date: transaction?.donorEmail ?? "",
              }}
            />

            <p className="text-[#475569] mt-4 mx-w-[382px] p-4">
              {transaction?.note}
            </p>

            <div className="h-0.5 w-[273px] mx-auto bg-gray-200 my-16"></div>

            <div className="flex flex-col gap-4">
              <h3 className="text-gray-800 text-base font-medium">
                Payment details
              </h3>
              <div className="flex text-base font-normal text-gray-600 justify-between">
                <p className="text-gray-400">Amount</p>
                <p>
                  {transaction?.currency}{" "}
                  {transaction?.amount?.toLocaleString()}
                </p>
              </div>

              <div className="flex text-base font-normal text-gray-600 justify-between">
                <p className="text-gray-400">Payment fee</p>
                <p>
                  {transaction?.currency} {transaction?.transactionFee}
                </p>
              </div>

              <div className="flex text-base font-normal text-gray-600 justify-between">
                <p className="text-gray-400">Transaction ID</p>
                <p>{transaction?.transactionReference}</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarDialog>
    </SidebarDialogRoot>
  );
}
