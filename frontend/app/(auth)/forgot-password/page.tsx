"use client";
import Button from "@/components/atoms/Button";

import Input from "@/components/atoms/Input";
import { InitiateResetPassword } from "@/services/auth";
import {
  IInitiateResetPasswordInputs,
  initiateResetPasswordSchema,
} from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function ForgotPassword() {
  const t = useTranslations("auth");
  const common = useTranslations("common");
  const [emailSent, setEmailSent] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IInitiateResetPasswordInputs>({
    resolver: zodResolver(initiateResetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    onSuccess() {
      toast.success(t("emailSent"), {
        id: "email",
      });
      setEmailSent(true);
    },
    onError(error) {
      toast.error(error.message, { id: "email" });
    },
    mutationFn: InitiateResetPassword,
  });

  const onSubmit = (data: IInitiateResetPasswordInputs) => {
    toast.loading(t("sendingEmail"), { id: "email" });
    mutate(data.email);
  };

  return (
    <Fragment>
      {emailSent ? (
        <div className="flex flex-col items-center justify-center h-full  p-8 lg:p-0">
          <h1 className="text-2xl font-bold mb-4 text-black">{t("emailSent")}</h1>
          <p className="text-center text-gray-600">
            {t("emailSentDescription", {email: watch("email")})}
          </p>
          <Button
            className="mt-6"
            onClick={() => {
              setEmailSent(false);
            }}
          >
            {t("changeEmail")}
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-gray-700 justify-between h-full  p-8 lg:p-0"
        >
          <div className="max-w-[562px] h-fit my-auto">
            <h1 className="text-gray-700 text-4xl font-mono mb-2">
              {t("resetPassword")}
            </h1>
            <p className="text-gray-600 font-normal text-lg">
              {t("resetInstructions")}
            </p>
            <Input
              label={common("email")}
              className="mb-4 mt-10"
              placeholder={t("emailExample")}
              value={watch("email")}
              onChange={(e) =>
                setValue("email", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              error={errors.email?.message}
            />
            <Button isLoading={isPending} className="w-full">
              {t("getInstructions")}
            </Button>
          </div>
        </form>
      )}
    </Fragment>
  );
}
