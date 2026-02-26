import React from "react";
import Dialog, { DialogRoot } from "./Dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import OTPInput from "./OTPInput";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EOtpTypes, VerifyOTP } from "@/services/users";
import { ICreateUser, step0 } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";

export default function VerifyPhoneModal({
  initialOpen,
}: {
  initialOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(initialOpen ?? false);
  const {
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ICreateUser>({
    resolver: zodResolver(step0),
  });

  const { mutate: verifyOTP, isPending } = useMutation({
    onSuccess() {
      toast.success("OTP verified successfully!", { id: "update-profile" });
      setOpen(false);
    },
    onError(error) {
      toast.error(error.message ?? "OTP verification failed!", {
        id: "update-profile",
      });
    },
    mutationFn: VerifyOTP,
  });

  const onSubmit = (data: ICreateUser) => {
    verifyOTP({ otpType: EOtpTypes.PHONE_VERIFICATION, otp: data.otp });
  };

  const handleVerifyOTP = (value: string) => {
    setValue("otp", value);
    if (value.length === 6 && Boolean(value)) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-fit">
        <span className="text-blue-500 underline text-sm">
          Verify phone number
        </span>
      </DialogTrigger>
      <Dialog className="pt-4 min-w-[600px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 text-black flex flex-col items-center"
        >
          <h1 className="text-2xl font-semibold mb-4">Verify phone number</h1>

          <div className="max-w-[500px]">
            <OTPInput
              error={errors.otp?.message}
              onChange={handleVerifyOTP}
              otpType={EOtpTypes.PHONE_VERIFICATION}
            />
          </div>
          <div className="flex gap-4 my-4">
            <Button type="submit" disabled={!isDirty} isLoading={isPending}>
              Verify
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </DialogRoot>
  );
}
