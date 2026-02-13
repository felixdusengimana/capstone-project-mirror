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
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPassword() {
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
      toast.success("Email sent!", {
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
    toast.loading("Sending email...", { id: "email" });
    mutate(data.email);
  };

  return (
    <>
      {emailSent ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold mb-4 text-black">Email Sent!</h1>
          <p className="text-center text-gray-600">
            We&apos;ve sent you an email to{" "}
            <span className="text-blue-500">{watch("email")}</span> with
            instructions <br /> on how to reset your password.
          </p>
          <Button
            className="mt-6"
            onClick={() => {
              setEmailSent(false);
            }}
          >
            Change email
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-gray-700 justify-between h-full "
        >
          <div className="max-w-[562px] h-fit my-auto">
            <h1 className="text-gray-700 text-4xl font-mono mb-2">
              Reset password
            </h1>
            <p className="text-gray-600 font-normal text-lg">
              Enter the email address with your account and we’ll send an email
              with instruction to reset your password
            </p>
            <Input
              label="Email"
              className="mb-4 mt-10"
              placeholder="Eg: fullname@email.com"
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
              Get instructions
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
