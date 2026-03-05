"use client";
import { EOtpTypes, GenerateOTP, useGetMe } from "@/services/users";
import { setCookie } from "@/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ResolveScreen() {
  const router = useRouter();
  const { data: user, isLoading } = useGetMe();

  // set otp if user didn't verify email
  const { mutate } = useMutation({
    mutationFn: () => GenerateOTP({ otpType: EOtpTypes.EMAIL_VERIFICATION }),
    onSuccess() {
      setCookie("pesatoneMiddleMan", "1", 7200);
      router.replace(`/join?step=1`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const resolver = () => {
      if (!isLoading) {
        const info = user?.data;
        if (!info?.id) return router.replace("/login");
        if (!info.emailVerified) {
          mutate();
        } else {
          const step = !info?.bio
            ? 2
            : !info.username
            ? 3
            : !info.countryName
            ? 4
            : info.socialLinks?.length <= 0
            ? 5
            : -1;

          if (step === -1) {
            setCookie("pesatoneMiddleMan", "true", 7200);
            return router.replace("/dashboard");
          }
          setCookie("pesatoneMiddleMan", String(step), 7200);
          return router.replace(`/join?step=${step}`);
        }
      }
    };
    resolver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="h-screen w-full bg-white">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center">
          {/* spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
