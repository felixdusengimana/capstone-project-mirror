"use client";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

import Icon, { IconNames } from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { useGetAllCountries } from "@/services/resources";
import { useGetCreator } from "@/services/users";
import { Tip, tip } from "@/types/pay";
import { supportedSocials } from "@/utils/socials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Script from "next/script";

export default function SupportCreator() {
  const { creatorId } = useParams() as { creatorId: string };
  const { data, isLoading } = useGetCreator(creatorId);
  const { data: countries, isLoading: isLoadingCountries } = useGetAllCountries(
    { enabled: true }
  );

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Tip>({
    resolver: zodResolver(tip),
  });

  useEffect(() => {
    if (!isLoading && !isLoadingCountries) {
      reset({
        creatorUserName: data?.data.username ?? "",
        currency: countries?.data?.[0].currency ?? "",
        donorUserName: "test",
        paymentProvider: "FLUTTERWAVE",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLoadingCountries]);

  function onSubmit(data: Tip) {
    // @ts-ignore
    FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTER_WAVE_KEY,
      tx_ref: String(Date.now()),
      amount: data.amount,
      currency: data.currency,
      payment_options: "card, banktransfer, ussd",
      meta: {
        source: "docs-inline-test",
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: "test@mailinator.com",
        phone_number: "08100000000",
        name: data.name,
      },
      customizations: {
        title: `Support ${data.creatorUserName}`,
        description: data.note,
        logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
      },
      callback: function (data: any) {
        console.log("payment callback:", data);
      },
      onclose: function () {
        console.log("Payment cancelled!");
      },
    });
  }

  return (
    <>
      <Script src="https://checkout.flutterwave.com/v3.js"></Script>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-24 h-full p-8 lg:p-0"
        >
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
                onChange={(e) =>
                  setValue("amount", Number(e.target.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors.amount?.message}
                value={watch("amount") > 0 ? watch("amount") : ""}
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

              <Input
                label="Your name"
                placeholder="Your name"
                value={watch("name")}
                error={errors.name?.message}
                onChange={(e) =>
                  setValue("name", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
              <TextArea
                label="Say something nice"
                placeholder="Type something ....."
                error={errors.note?.message}
                value={watch("note")}
                onChange={(e) => setValue("note", e.target.value)}
              />
            </div>
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-100 text-red-500 p-4 rounded-lg">
                {Object.values(errors).map((error, i) => (
                  <p key={i}>{error.message}</p>
                ))}
              </div>
            )}
            <Button type="submit" className="w-full">
              Pay {watch("amount")?.toLocaleString()} {watch("currency")}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
