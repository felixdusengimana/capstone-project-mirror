"use client";
import Button from "@/components/atoms/Button";

import Input from "@/components/atoms/Input";
import { ResetPassword } from "@/services/auth";
import { IResetPasswordInputs, resetPasswordSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  const searchParams = useSearchParams();
  const token = searchParams.get("tkn");
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
    },
  });

  const { mutate, isPending } = useMutation({
    onSuccess() {
      toast.success("Email sent!", {
        id: "email",
      });
    },
    onError(error) {
      toast.error(error.message, { id: "email" });
    },
    mutationFn: ResetPassword,
  });

  const onSubmit = (data: IResetPasswordInputs) => {
    toast.loading("Sending email...", { id: "email" });
    mutate(data);
  };

  return (
    <>
      {!token ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold mb-4 text-black">Link expired!</h1>
          <p className="text-center text-gray-600">
            The link you clicked has expired. Please request a new link.
          </p>
          <Link href="/forgot-password">
            <Button className="mt-6">Request new link</Button>
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-gray-700 justify-between h-full"
        >
          <div></div>
          <div className="max-w-[562px]">
            <h1 className="text-gray-700 text-4xl font-mono mb-4">
              Reset password
            </h1>
            <p className="text-gray-600 font-normal text-lg">
              This password should be different from the previous password
            </p>
            <Input
              label="Password"
              className="mb-4 mt-10"
              type="password"
              placeholder="● ● ● ● ● ● ●"
              value={watch("password")}
              onChange={(e) => {
                setValue("password", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              error={errors.password?.message}
            />
            <Input
              label="Retype password"
              type="password"
              placeholder="● ● ● ● ● ● ●"
              value={watch("password2")}
              onChange={(e) => {
                setValue("password2", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              error={errors.password2?.message}
            />
            <Button isLoading={isPending} className="w-full mt-10">
              Reset password
            </Button>
          </div>
          <div></div>
        </form>
      )}
    </>
  );
}
