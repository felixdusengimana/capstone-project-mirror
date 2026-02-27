"use client";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Input from "../atoms/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IInitiatePayout, payout } from "@/types/payouts";
import { useState } from "react";
import { EChannel, ECurrency } from "@/types";
import Select from "../atoms/Select";
import { EOtpTypes, GenerateOTP, useGetMe } from "@/services/users";
import { convertEmail } from "@/utils/convertEmail";
import OTPInput from "./OTPInput";
import { useMutation } from "@tanstack/react-query";
import { InitiatePayouts } from "@/services/payouts";
import toast from "react-hot-toast";
import { useGetWallet } from "@/services/wallet";
import { z } from "zod";
import { TransactionData } from "@/types/pay";

export default function WithdrawForm({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const { data: me, isLoading } = useGetMe();
  const [active, setActive] = useState<"form" | "otp" | "success">("form");
  const [open, setOpen] = useState(false);

  const { data: wallet, isLoading: walletLoading } = useGetWallet();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IInitiatePayout>({
    resolver: zodResolver(
      z.object({
        amount: z
          .number({
            required_error: "Amount is required",
          })
          .min(100, "Amount must be greater than 100")
          .max(
            wallet?.data.balance ?? 0,
            `Amount must be less than ${wallet?.data.balance.toLocaleString()} ${
              wallet?.data.currency
            }`
          ),
        paymentChannel: z.nativeEnum(EChannel, {
          required_error: "Payment channel is required",
          invalid_type_error: "Pleas select payment channel",
        }),
        currency: z.nativeEnum(ECurrency, {
          required_error: "Currency is required",
          invalid_type_error: "Pleas select Currency",
        }),
      })
    ),
    defaultValues: {
      currency: ECurrency.RWF,
    },
  });

  // set otp if user didn't verify email
  const { mutate: sendFirstOtp, isPending: isSendingOTP } = useMutation({
    mutationFn: () => GenerateOTP({ otpType: EOtpTypes.PAYOUT }),
    onSuccess() {
      setActive("otp");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: InitiatePayouts,
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
            email: me?.data?.email,
            name: me?.data.name,
          },
          customizations: {
            title: `Withdraw from ${me?.data.name}`,
            description: me?.data.bio,
            logo: "/app-logo.svg",
          },
          callback: function (success_data: TransactionData) {
            if (success_data.status === "successful") {
              setActive("success");
            } else {
              toast.error("Payout failed");
            }
          },
          // success_data
          onclose: function () {},
        });
      } else {
        toast.error("Error initiating this payment");
      }
    },
    onError(error) {
      toast.error(error.message, {
        id: "payout",
      });
    },
  });

  const onSubmit = (data: IInitiatePayout) => {
    sendFirstOtp();
  };

  return (
    <DialogRoot onOpenChange={setOpen} open={open}>
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
      <Dialog preventCloseOnClickOutside className="p-10 bg-[#F0F2F7]">
        {active === "form" ? (
          <>
            <div className="w-full py-6 pb-16 bg-white rounded-lg border-gray-200">
              <div className="px-8 border-b border-gray-100 pb-6 mb-6">
                <p className="text-gray-500 text-base font-light">
                  Available to withdraw
                </p>
                {walletLoading ? (
                  <div className="animate-pulse h-8 w-24 bg-gray-200 rounded-lg mt-4"></div>
                ) : (
                  <h3 className=" text-gray-800 font-medium text-4xl flex items-center gap-2 mt-4">
                    <span className="font-normal text-base text-gray-400">
                      {wallet?.data?.currency}
                    </span>{" "}
                    {wallet?.data.balance.toLocaleString()}
                  </h3>
                )}
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 flex flex-col gap-4"
              >
                <Input
                  label="Enter amount"
                  onChange={(e) =>
                    setValue(
                      "amount",
                      Number(e.target.value.replaceAll(",", "")),
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                  error={errors.amount?.message || errors.currency?.message}
                  autoFocus
                  type="number"
                  right={
                    <select
                      value={watch("currency")}
                      onChange={(e) => {
                        setValue("currency", e.target.value as ECurrency, {
                          shouldValidate: true,
                        });
                      }}
                      className="bg-[#F7F9FB] text-[#475569]"
                    >
                      {Object.keys(ECurrency).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  }
                />

                <Select
                  value={watch("paymentChannel")}
                  label="Payment mode"
                  error={errors.paymentChannel?.message}
                  onChange={(e) =>
                    setValue("paymentChannel", e.target.value as EChannel, {
                      shouldValidate: true,
                    })
                  }
                  placeholder="Select Payment Channel"
                >
                  {Object.keys(EChannel).map((d) => (
                    <option key={d} value={d}>
                      {d.replaceAll("_", " ")}
                    </option>
                  ))}
                </Select>

                <div className="flex flex-col gap-4">
                  <Button
                    disabled={
                      Object.keys(errors).length > 0 ||
                      isLoading ||
                      walletLoading
                    }
                    className="w-full mt-8"
                    isLoading={isSendingOTP}
                  >
                    Withdraw{" "}
                    {Boolean(watch("amount"))
                      ? Number(watch("amount"))?.toLocaleString()
                      : " - "}
                    RWF
                  </Button>
                  <Button
                    className="w-full bg-gray-200 text-[#4B5563]"
                    style={{
                      color: "#4B5563",
                    }}
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={isSendingOTP}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : active === "otp" ? (
          <div className="max-w-[591px] flex items-center flex-col gap-10">
            <p className="text-black">
              Enter OTP code sent to{" "}
              <span className="text-gray-700">
                {convertEmail(me?.data?.email ?? "")}
              </span>
            </p>
            <div className="max-w-[378]">
              <OTPInput
                onChange={(value) => {
                  if (value.length === 6) {
                    mutate({ ...watch(), otp: value });
                  }
                }}
                otpType={EOtpTypes.PAYOUT}
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <Button
                isLoading={isPending}
                disabled={Object.keys(errors).length > 0 || isLoading}
                className="w-full mt-8"
              >
                Verify OTP
              </Button>
              <Button
                disabled={isPending}
                className="w-full bg-gray-200 text-[#4B5563]"
                style={{
                  color: "#4B5563",
                }}
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-10 pt-10 relative">
            <svg
              width="86"
              height="102"
              viewBox="0 0 86 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -left-10"
            >
              <rect
                x="-32"
                width="118"
                height="26"
                rx="13"
                fill="#10B981"
                fill-opacity="0.29"
              />
              <circle cx="35" cy="91" r="11" fill="#AFE2D4" />
            </svg>

            <svg
              width="70"
              height="174"
              viewBox="0 0 70 174"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -right-10"
            >
              <rect
                x="11"
                y="148"
                width="118"
                height="26"
                rx="13"
                fill="#10B981"
                fill-opacity="0.29"
              />
              <circle cx="11" cy="11" r="11" fill="#B3AFE2" />
            </svg>

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
            <p className="text-gray-800 font-light text-2xl">
              Withdraw success !
            </p>
            <p className="font-medium text-4xl text-gray-800 flex items-start justify-start">
              <span className="text-base font-medium text-gray-400">
                {watch("currency")}
              </span>
              {watch("amount").toLocaleString()}
            </p>

            <p className="text-gray-800">Send to {me?.data?.name}</p>

            <div className="w-full flex flex-col gap-4">
              <Button
                isLoading={isPending}
                onClick={() => setOpen(false)}
                className="w-full mt-8"
              >
                Back Home
              </Button>
              <Button
                disabled={isPending}
                className="w-full bg-gray-200 text-[#4B5563]"
                style={{
                  color: "#4B5563",
                }}
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </DialogRoot>
  );
}
