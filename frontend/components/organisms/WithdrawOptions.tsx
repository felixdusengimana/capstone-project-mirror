import { EChannel } from "@/types";
import React, { useState } from "react";
import Dialog, { DialogRoot } from "../molecules/Dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import {
  IWithdrawAccount,
  withdrawAccountPhone,
  withdrawAccountWithBank,
} from "@/types/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface IWithdrawOptions {
  trigger: React.ReactNode;
  type: EChannel;
  initialData?: Partial<IWithdrawAccount>;
}
export default function WithdrawOptions({
  trigger,
  type,
  initialData,
}: IWithdrawOptions) {
  const [openModal, setOpenModal] = useState(false);

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IWithdrawAccount>({
    resolver: zodResolver(
      type === EChannel.MOBILE_MONEY
        ? withdrawAccountPhone
        : withdrawAccountWithBank
    ),
    defaultValues: {
      phoneNumber: initialData?.phoneNumber,
      bankName: initialData?.bankName,
      accountName: initialData?.accountName,
      accountNumber: initialData?.accountNumber,
    },
  });

  const onSubmit = (data: IWithdrawAccount) => {
    console.log(data);
    setOpenModal(false);
    reset();
  };

  return (
    <DialogRoot open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <Dialog className="p-5">
        <h1 className="font-medium text-gray-600 text-lg">
          {(initialData?.phoneNumber && type === EChannel.MOBILE_MONEY) ||
          (initialData?.accountNumber && type === EChannel.BANK_ACCOUNT)
            ? "Edit"
            : "Add"}{" "}
          {type === EChannel.BANK_ACCOUNT ? "Bank Account" : "Mobile Money"}{" "}
          Information
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {type === EChannel.MOBILE_MONEY ? (
            <Input
              error={errors.phoneNumber?.message}
              label="Mobile Number"
              onChange={(e) =>
                setValue("phoneNumber", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              value={watch("phoneNumber")}
            />
          ) : (
            <>
              <Select
                error={errors.bankName?.message}
                label="Bank Name"
                onChange={(e) =>
                  setValue("bankName", e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                value={watch("bankName")}
                placeholder=" Select Bank"
              >
                <option value="zenith">Zenith Bank</option>
                <option value="gtb">GT Bank</option>
                <option value="firstbank">First Bank</option>
                <option value="access">Access Bank</option>
              </Select>
              <Input
                error={errors.accountNumber?.message}
                label="Account Number"
                value={watch("accountNumber")}
                onChange={(e) =>
                  setValue("accountNumber", e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
              <Input
                error={errors.accountName?.message}
                label="Account Name"
                value={watch("accountName")}
                onChange={(e) =>
                  setValue("accountName", e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            </>
          )}

          <div className="flex gap-3 mt-3">
            <Button className="w-fit" disabled={!isDirty}>
              Save
            </Button>
            <Button
              onClick={() => setOpenModal(false)}
              type="button"
              variant="danger"
              className="w-fit"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </DialogRoot>
  );
}
