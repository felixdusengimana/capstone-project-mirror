import { EOtpTypes, GenerateOTP } from "@/services/users";
import * as OTP from "@frjoy/otp";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OTPInput({
  onChange,
  error,
  otpType,
}: {
  onChange: (value: string) => void;
  error?: string;
  otpType: EOtpTypes;
}) {
  const [countDown, setCountDown] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: () => GenerateOTP({ otpType }),
    onSuccess() {
      setCountDown(60);
      toast.success("OTP sent successfully");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countDown]);

  const minutes = Math.floor(countDown / 60);
  const seconds = countDown % 60;

  return (
    <div className="w-fit">
      <div className="flex gap-6">
        <OTP.Root onChange={onChange}>
          <OTP.Input
            disabled={isPending}
            className={`border ${
              error ? "border-red-400" : "border-gray-200"
            } bg-gray-50 py-5 rounded-xl w-[124.5px] text-center text-black`}
          />
          <OTP.Input
            disabled={isPending}
            className={`border ${
              error ? "border-red-400" : "border-gray-200"
            } bg-gray-50 py-5 rounded-xl w-[124.5px] text-center text-black`}
          />
          <OTP.Input
            disabled={isPending}
            className={`border ${
              error ? "border-red-400" : "border-gray-200"
            } bg-gray-50 py-5 rounded-xl w-[124.5px] text-center text-black`}
          />
          <OTP.Input
            disabled={isPending}
            className={`border ${
              error ? "border-red-400" : "border-gray-200"
            } bg-gray-50 py-5 rounded-xl w-[124.5px] text-center text-black`}
          />
          <OTP.Input
            disabled={isPending}
            className={`border ${
              error ? "border-red-400" : "border-gray-200"
            } bg-gray-50 py-5 rounded-xl w-[124.5px] text-center text-black`}
          />
          <OTP.Input
            disabled={isPending}
            className={`border ${
              error ? "border-red-400" : "border-gray-200"
            } bg-gray-50 py-5 rounded-xl w-[124.5px] text-center text-black`}
          />
        </OTP.Root>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {countDown > 0 ? (
        <div className="flex justify-center items-center mt-6">
          <p className="text-sm text-gray-500">
            Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => mutate()}
            type="button"
            className="text-sm text-gray-500 underline hover:text-blue-500"
          >
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
}
