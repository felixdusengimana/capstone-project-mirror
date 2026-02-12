"use client";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

import Icon, { IconNames } from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { useGetAllCountries } from "@/services/resources";
import { useGetCreator } from "@/services/users";
import { supportedSocials } from "@/utils/socials";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SupportCreator() {
  const [tipAmount, setTipAmount] = useState(0);
  const { creatorId } = useParams() as { creatorId: string };
  const { data, isLoading } = useGetCreator(creatorId);
  const { data: countries, isLoading: isLoadingCountries } = useGetAllCountries(
    { enabled: true }
  );

  return (
    <>
      {isLoading ? (
        // add skeleton loader for below content
        <div className="flex flex-col items-center gap-24 h-full p-8 lg:p-0">
          <h1 className="text-[#374151] text-4xl font-mono text-center">
            Pesatone makes Supporting fun and easy.
          </h1>
          <div className="animate-pulse w-full lg:w-[598px] flex flex-col items-center justify-between gap-10  rounded-2xl border border-gray-200 pt-24 pb-[61px] px-20 relative">
            <div className="absolute -top-16">
              <Avatar size="xl" src="" />
            </div>
            <div className="flex items-center">
              <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="h-12 w-full bg-gray-300 rounded-full"></div>
              <div className="h-12 w-full bg-gray-300 rounded-full"></div>
              <div className="h-12 w-full bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-12 w-full bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ) : !data?.data ? (
        <div className="flex flex-col items-center gap-24 h-full p-8 lg:p-0">
          <h1 className="text-[#374151] text-4xl font-mono text-center">
            Creator not found
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-24 h-full p-8 lg:p-0">
          <h1 className="text-[#374151] text-4xl font-mono text-center">
            Pesatone makes Supporting fun and easy.
          </h1>
          <div className="w-full lg:w-[598px] flex flex-col items-center justify-between gap-10  rounded-2xl border border-gray-200 pt-24 pb-[61px] px-20 relative">
            <div className="absolute -top-16">
              <Avatar src={data?.data.profileImageUrl ?? ""} size="xl" />
            </div>

            <div className="flex items-center">
              <h1 className="text-black">{data?.data.name}</h1>
              {data?.data.verified && <Icon name="verified" />}
            </div>

            <div className="flex items-center gap-4">
              {data?.data.socialLinks.map((link, i) => (
                <a
                  href={link.link}
                  key={i}
                  title={link.platform}
                  target="_blank"
                >
                  <Icon
                    name={
                      supportedSocials.includes(
                        link.platform.toLocaleLowerCase()
                      )
                        ? (link.platform.toLocaleLowerCase() as IconNames)
                        : "web"
                    }
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Input
                label="Tip amount"
                placeholder="Tip amount"
                onChange={(e) => setTipAmount(Number(e.target.value))}
                value={Number(tipAmount) > 0 ? tipAmount : ""}
                type="number"
                right={
                  <select className="bg-[#F7F9FB] text-[#475569] outline-none appearance-none">
                    {countries?.data.map((country, i) => (
                      <option key={i} value={country.currency}>
                        {country.currency}
                      </option>
                    ))}
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
      )}
    </>
  );
}
