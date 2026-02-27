"use client";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

import Icon, { IconNames } from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import {} from "@/services/resources";
import { useGetCreator } from "@/services/users";
import { Tip, tip, TransactionData } from "@/types/pay";
import { supportedSocials } from "@/utils/socials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Script from "next/script";
import { useMutation } from "@tanstack/react-query";
import { InitiateTransaction } from "@/services/pay";
import toast from "react-hot-toast";
import Link from "next/link";
import { ECurrency } from "@/types";

export default function SupportCreator() {
  const { creatorId } = useParams() as { creatorId: string };
  const [successPayment, seSuccessPayment] = useState(false);
  const { data, isLoading } = useGetCreator(creatorId);

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Tip>({
    resolver: zodResolver(tip),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: InitiateTransaction,
    onSuccess: async (data) => {
      if (data?.data?.transactionReference) {
        // @ts-ignore
        FlutterwaveCheckout({
          public_key: process.env.NEXT_PUBLIC_FLUTTER_WAVE_KEY,
          tx_ref: data?.data?.transactionReference,
          amount: data?.data.amount,
          currency: data?.data.currency,
          payment_options: "card, banktransfer, ussd",
          meta: {
            source: "docs-inline-test",
          },
          customer: {
            email: watch("email"),
            name: data?.data.donorName,
          },
          customizations: {
            title: `Support ${data?.data.creatorUserName}`,
            description: data?.data.note,
            logo: "/app-logo.svg",
          },
          callback: function (success_data: TransactionData) {
            if (success_data.status === "successful") {
              seSuccessPayment(true);
            } else {
              toast.error("Payment failed");
            }
          },
          // success_data
          onclose: function () {},
        });
      } else {
        toast.error("Error initiating this payment");
      }
    },
  });

  function onSubmit(data: Tip) {
    mutate(data);
  }

  useEffect(() => {
    if (!isLoading) {
      reset({
        creatorUserName: data?.data.username ?? "",
        currency: ECurrency.RWF,
        donorUserName: "",
        paymentProvider: "FLUTTERWAVE",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Script src="https://checkout.flutterwave.com/v3.js"></Script>

      {successPayment ? (
        <div className="relative h-[calc(100vh-300px)] ">
          <svg
            className="absolute -left-10"
            width="86"
            height="26"
            viewBox="0 0 86 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-32"
              width="118"
              height="26"
              rx="13"
              fill="#10B981"
              fillOpacity="0.29"
            />
          </svg>
          <svg
            width="86"
            height="26"
            viewBox="0 0 86 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -right-16 rotate-180 top-[50%] transform -translate-y-1/2"
          >
            <rect
              x="-32"
              width="118"
              height="26"
              rx="13"
              fill="#10B981"
              fillOpacity="0.29"
            />
          </svg>

          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[30%]"
          >
            <circle cx="11" cy="11" r="11" fill="#AFE2D4" />
          </svg>

          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0"
          >
            <circle cx="11" cy="11" r="11" fill="#B3AFE2" />
          </svg>

          <div className="flex h-full items-center justify-center flex-col text-gray-800 py-10">
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="64" height="64" rx="32" fill="#10B981" />
              <path
                d="M43.6834 24.0164C43.5285 23.8602 43.3441 23.7362 43.141 23.6516C42.9379 23.567 42.7201 23.5234 42.5001 23.5234C42.2801 23.5234 42.0622 23.567 41.8591 23.6516C41.656 23.7362 41.4717 23.8602 41.3167 24.0164L28.9001 36.4498L23.6834 31.2164C23.5225 31.061 23.3326 30.9388 23.1245 30.8568C22.9165 30.7748 22.6943 30.7346 22.4706 30.7385C22.247 30.7424 22.0263 30.7902 21.8212 30.8794C21.616 30.9685 21.4305 31.0972 21.2751 31.2581C21.1197 31.419 20.9975 31.6089 20.9155 31.817C20.8335 32.0251 20.7933 32.2473 20.7971 32.4709C20.801 32.6945 20.8489 32.9152 20.938 33.1203C21.0272 33.3255 21.1559 33.511 21.3167 33.6664L27.7167 40.0664C27.8717 40.2227 28.056 40.3466 28.2591 40.4313C28.4622 40.5159 28.6801 40.5594 28.9001 40.5594C29.1201 40.5594 29.3379 40.5159 29.541 40.4313C29.7441 40.3466 29.9285 40.2227 30.0834 40.0664L43.6834 26.4664C43.8526 26.3104 43.9876 26.1209 44.0799 25.9101C44.1723 25.6993 44.22 25.4716 44.22 25.2414C44.22 25.0113 44.1723 24.7836 44.0799 24.5728C43.9876 24.3619 43.8526 24.1725 43.6834 24.0164Z"
                fill="white"
              />
            </svg>

            <h3 className="mt-8">Success !</h3>
            <p className="max-w-[307px] text-center mt-4">
              Thank you for supporting{" "}
              <span className="font-bold">{data?.data?.name}</span>
              <br />
              Your support have been sent
            </p>
          </div>

          <Link href={"/"}>
            <Button className="w-full mt-8">Back home</Button>
          </Link>
        </div>
      ) : (
        <>
          {isLoading ? (
            // add skeleton loader for below content
            <div className="flex flex-col items-center gap-24 h-full p-8 lg:p-0">
              <h1 className="text-[#374151] text-4xl font-mono text-center">
                Pesatone makes Supporting fun and easy.
              </h1>
              <div className="animate-pulse w-full lg:w-[598px] flex flex-col items-center justify-between gap-10  rounded-2xl border border-gray-200 pt-24 pb-[61px] px-5 md:px-20 relative">
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
              className="flex flex-col items-center gap-2 lg:gap-24 h-full py-8 lg:py-0"
            >
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
                      <select
                        value={watch("currency")}
                        onChange={(e) => {
                          setValue("currency", e.target.value);
                        }}
                        className="bg-[#F7F9FB] text-[#475569] outline-none appearance-none"
                      >
                        {Object.keys(ECurrency)?.map((key) => (
                          <option key={key} className="capitalize" value={key}>
                            {key}
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

                  <Input
                    label="Your email"
                    placeholder="Your email"
                    value={watch("email")}
                    error={errors.email?.message}
                    onChange={(e) =>
                      setValue("email", e.target.value, {
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
                    onChange={(e) =>
                      setValue("note", e.target.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
                {/* {Object.keys(errors).length > 0 && (
                  <div className="bg-red-100 text-red-500 p-4 rounded-lg">
                    {Object.values(errors).map((error, i) => (
                      <p key={i}>{error.message}</p>
                    ))}
                  </div>
                )} */}
                <Button type="submit" className="w-full" isLoading={isPending}>
                  Pay {watch("amount")?.toLocaleString()} {watch("currency")}
                </Button>
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
}
