"use client";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Button from "../atoms/Button";
import CardIcon from "./CardIcon";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomWebcam from "./CustomWebcam";
import Link from "next/link";
import { UploadVerificationImage } from "@/services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function VerifyAccount({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const t = useTranslations("components");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const verifyStep = searchParams.get("verify");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  function handleOpenChange(open: boolean) {
    setOpen(open);
  }

  useEffect(() => {
    if (verifyStep) {
      setOpen(true);
    }
  }, [verifyStep]);

  const { mutate: updateProfilePic, isPending: isUpdatingPic } = useMutation({
    mutationFn: UploadVerificationImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success(t("verificationUploaded"), {
        id: "updatingProfile",
      });

      router.push(`${pathName}?verify=done`);
    },
    onError: () => {
      toast.error(t("pictureFailed"), {
        id: "updatingProfile",
      });
    },
  });

  return (
    <DialogRoot open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div className="w-full">
          {trigger ?? (
            <button className="text-sm bg-gray-900 text-white rounded-full font-normal py-[11px] w-[204px]">
              {t("getVerified")}
            </button>
          )}
        </div>
      </DialogTrigger>
      <Dialog className="p-10 bg-[#d6d8dd] overflow-hidden">
        {verifyStep === "1" ? (
          <CustomWebcam
            isUpdatingPic={isUpdatingPic}
            updateProfilePic={(data) => updateProfilePic(data)}
          />
        ) : verifyStep === "done" ? (
          <div className="relative">
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

            <div className="flex items-center justify-center flex-col text-gray-800 py-10">
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

              <h3 className="mt-8">{t("verificationUploaded")}</h3>
              <p className="max-w-[307px] text-center mt-4">
                {t("verificationThanks")}
              </p>
            </div>

            <Link href="/dashboard">
              <Button
                className="w-full mt-8"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {t("backHome")}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full py-6 pb-16 bg-[#fff] rounded-lg border-gray-200">
              <div className="px-8 pb-6 mb-6">
                <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">
                  {t("verificationTips")}
                </h1>
              </div>

              <form action="" className="px-8 flex flex-col gap-4">
                <div className="flex gap-4">
                  <CardIcon
                    icon="camera-center-focus"
                    className="bg-[#F9FAFB] border border-gray-200 w-[40px] min-w-[40px] h-[40px]"
                  />
                  <p
                    className="text-[#475569] max-w-[258px] font-normal text-sm leading-6"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {t("centerFace")}
                  </p>
                </div>

                <div className="flex gap-4">
                  <CardIcon
                    icon="sun"
                    className="bg-[#F9FAFB] border border-gray-200 max-w-[40px] min-w-[40px] h-[40px]"
                  />
                  <p
                    className="text-[#475569] max-w-[258px] font-normal text-sm leading-6"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {t("goodLighting")}
                  </p>
                </div>
                <div className="flex gap-4">
                  <CardIcon
                    icon="glasses"
                    className="bg-[#F9FAFB] border border-gray-200 max-w-[40px] min-w-[40px] h-[40px]"
                  />
                  <p
                    className="text-[#475569] max-w-[361px] font-normal text-sm leading-6"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {t("uncoveredFace")}
                  </p>
                </div>
              </form>
            </div>
            <Button
              className="w-full mt-8"
              onClick={() => {
                router.push(pathName + "?verify=1");
              }}
            >
              {t("verifyAccount")}
            </Button>
          </>
        )}
        <Link href="/dashboard">
          <Button
            className="w-full bg-gray-200 text-[#4B5563] mt-4"
            style={{
              color: "#4B5563",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            {t("cancel")}
          </Button>
        </Link>
      </Dialog>
    </DialogRoot>
  );
}
