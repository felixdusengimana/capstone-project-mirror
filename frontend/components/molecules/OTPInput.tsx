import * as OTP from "@frjoy/otp";
import { useEffect, useState } from "react";

export default function OTPInput({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [countDown, setCountDown] = useState(60);

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
          <OTP.Input className="border border-r-gray-200 bg-gray-50 py-5 rounded-xl w-[124.5px] text-center" />
          <OTP.Input className="border border-r-gray-200 bg-gray-50 py-5 rounded-xl w-[124.5px] text-center" />
          <OTP.Input className="border border-r-gray-200 bg-gray-50 py-5 rounded-xl w-[124.5px] text-center" />
          <OTP.Input className="border border-r-gray-200 bg-gray-50 py-5 rounded-xl w-[124.5px] text-center" />
        </OTP.Root>
      </div>
      {countDown > 0 ? (
        <div className="flex justify-center items-center mt-6">
          <p className="text-sm text-gray-500">
            Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <button
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
