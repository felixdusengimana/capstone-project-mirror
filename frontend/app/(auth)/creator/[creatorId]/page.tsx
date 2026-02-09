"use client";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { useState } from "react";

export default function SupportCreator() {
  const [tipAmount, setTipAmount] = useState(5000);
  return (
    <div className="flex flex-col items-center gap-24 h-full">
      <h1 className="text-[#374151] text-4xl font-mono text-center">
        Pesatone makes Supporting fun and easy.
      </h1>
      <div className="w-[598px] flex flex-col items-center justify-between gap-10  rounded-2xl border border-gray-200 pt-24 pb-[61px] px-20 relative">
        <div className="absolute -top-16">
          <Avatar src="/profiles/profile1.png" size="xl" />
        </div>

        <div className="flex items-center">
          <h1 className="text-black">The Ben</h1>
          <Icon name="verified" />
        </div>

        <div className="flex items-center gap-4">
          <Icon name="facebook" width={20} height={20} fill="#9CA3AF" />
          <Icon name="youtube" width={20} height={20} fill="#9CA3AF" />
          <Icon name="instagram" width={20} height={20} fill="#9CA3AF" />
          <Icon name="twitter" width={20} height={20} fill="#9CA3AF" />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Input
            label="Tip amount"
            placeholder="Tip amount"
            onChange={(e) => setTipAmount(Number(e.target.value))}
            value={Number(tipAmount) > 0 ? tipAmount : ""}
            type="number"
            right={
              <select className="bg-[#F7F9FB] text-[#475569] outline-none">
                <option value="RWF">RWF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            }
          />

          <Input label="Your name" placeholder="Your name" />
          <TextArea
            label="Say something nice"
            placeholder="Type something ....."
          />
        </div>
        <Button className="w-full" disabled={Number(tipAmount) <= 0}>
          Pay {tipAmount.toLocaleString()} RWF
        </Button>
      </div>
    </div>
  );
}
