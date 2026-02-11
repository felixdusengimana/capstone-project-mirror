"use client";
import Button from "@/components/atoms/Button";

import Input from "@/components/atoms/Input";
import ThirdPartyLogin from "@/components/molecules/ThirdPartyLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRegisterInputs, registerSchema } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/services/auth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    onSuccess(data) {
      toast.success("Registration successful!", { id: "register" });
      console.log({ data });
      router.push("/login");
    },
    onError(error) {
      toast.error(`${error.message ?? "Registration failed!"}`, {
        id: "register",
      });
    },
    mutationFn: Register,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IRegisterInputs) => {
    toast.loading("Registering...", { id: "register" });
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-gray-700 justify-between h-full p-8 lg:p-0"
    >
      <p className="text-right font-light text-lg text-gray-500">
        Already have an account,{" "}
        <Link href={"/login"} className="font-medium underline">
          Login
        </Link>
      </p>
      <div className="max-w-[562px]">
        <h1 className="text-gray-700 text-4xl font-mono mb-10">
          Fund your creative work
        </h1>
        <ThirdPartyLogin thirdParty="google" />
        <div className="my-6 flex gap-5 justify-center items-center">
          <div className="bg-gray-400 h-[1px] w-[105.5px]" />
          <p className="text-gray-400 leading-6">OR</p>
          <div className="bg-gray-400 h-[1px] w-[105.5px]" />
        </div>
        <Input
          label="Email"
          className="mb-4"
          placeholder="Eg: fullname@email.com"
          error={errors.email?.message}
          type="email"
          onChange={(e) =>
            setValue("email", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
        <Input
          label="Password"
          type="password"
          placeholder="● ● ● ● ● ● ●"
          error={errors.password?.message}
          onChange={(e) =>
            setValue("password", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
      </div>

      <div className="flex items-center flex-wrap justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          outline={true}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button isLoading={isPending} className="px-[72px]">
          {isPending ? "Singing up..." : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
