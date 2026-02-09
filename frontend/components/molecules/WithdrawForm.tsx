"use client";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Input from "../atoms/Input";

export default function WithdrawForm({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  return (
    <DialogRoot>
      <DialogTrigger>
        <div>
          {trigger ?? (
            <Button className="flex gap-0.5 items-center">
              <Icon name="cash-out" />
              <p className="font-medium text-sm text-white">Withdraw</p>
            </Button>
          )}
        </div>
      </DialogTrigger>
      <Dialog className="p-10 bg-[#d6d8dd]">
        <div className="w-full py-6 pb-16 bg-white rounded-lg border-gray-200">
          <div className="px-8 border-b border-gray-100 pb-6 mb-6">
            <p className="text-gray-500 text-base font-light">
              Available to withdraw
            </p>
            <h1 className="text-gray-800 font-medium text-4xl flex items-center gap-2 mt-4">
              <span className="font-normal text-base text-gray-400">RWF</span>{" "}
              50,000
            </h1>
          </div>

          <form action="" className="px-8 flex flex-col gap-4">
            <Input
              label="Enter amount"
              value={"50,000"}
              right={
                <select className="bg-[#F7F9FB] text-[#475569]">
                  <option value="RWF">RWF</option>
                </select>
              }
            />

            <Input
              label="Withdraw to"
              value={"0789 394 053"}
              left={
                <select className="bg-[#F7F9FB] mr-2 text-[#475569]">
                  <option value="RWF">🇷🇼</option>
                  <option value="USD">🇺🇸</option>
                </select>
              }
            />
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="w-full mt-8">Withdraw 50,000 RWF</Button>
          <Button
            className="w-full bg-gray-200 text-[#4B5563]"
            style={{
              color: "#4B5563",
            }}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
