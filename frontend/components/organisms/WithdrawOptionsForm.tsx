import { EChannel } from "@/types";
import React, { useEffect, useState } from "react";
import Dialog, { DialogRoot } from "../molecules/Dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetAllBanks } from "@/services/resources";
import {
  IWithdrawAccount,
  withdrawAccountPhone,
  withdrawAccountWithBank,
} from "@/types/withdrawal-accounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateWithdrawAccount,
  UpdateWithdrawAccount,
} from "@/services/withdrawal-accounts";
import toast from "react-hot-toast";

interface IWithdrawOptions {
  trigger: React.ReactNode;
  type: EChannel;
  initialData?: Partial<IWithdrawAccount> & { id: number };
}
export default function WithdrawOptionsForm({
  trigger,
  type,
  initialData,
}: IWithdrawOptions) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const { data: banks, isPending: isLoadingBanks } = useGetAllBanks({
    enabled: openModal,
  });

  const { mutate: addWithDrawalAccount, isPending: isAddingAccount } =
    useMutation({
      mutationFn: CreateWithdrawAccount,
      onSuccess: () => {
        toast.success("Withdrawal account added successfully", {
          id: "withdrawal-account",
        });
        handleSuccessClose();
      },
      onError: (error) => {
        toast.error(
          error.message ?? "Unable to add withdrawal account, try again!",
          {
            id: "withdrawal-account",
          }
        );
      },
    });

  const { mutate: updateWithDrawalAccount, isPending: isUpdatingAccount } =
    useMutation({
      mutationFn: UpdateWithdrawAccount,
      onSuccess: () => {
        toast.success("Withdrawal account updated successfully", {
          id: "withdrawal-account",
        });
        handleSuccessClose();
      },
      onError: (error) => {
        toast.error(
          error.message ?? "Unable to update withdrawal account, try again!",
          {
            id: "withdrawal-account",
          }
        );
      },
    });

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
      bankCode: initialData?.bankCode,
      accountName: initialData?.accountName,
      accountNumber: initialData?.accountNumber,
    },
  });

  const handleSuccessClose = () => {
    queryClient.invalidateQueries({
      queryKey: ["withdrawal-accounts"],
    });
    setOpenModal(false);
    reset();
  };

  const onSubmit = (data: IWithdrawAccount) => {
    if (initialData?.accountNumber) {
      updateWithDrawalAccount({
        id: initialData.id,
        data: { ...data, accountType: type },
      });
    } else {
      addWithDrawalAccount({ ...data, accountType: type });
    }
  };

  useEffect(() => {
    if (initialData?.accountNumber) {
      reset({
        bankCode: initialData.bankCode,
        accountName: initialData.accountName,
        accountNumber: initialData.accountNumber,
        accountType: initialData.accountType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <DialogRoot open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <Dialog className="p-5">
        <h1 className="font-medium text-gray-600 text-lg">
          {initialData?.accountNumber ? "Edit" : "Add"}{" "}
          {type === EChannel.BANK_ACCOUNT ? "Bank Account" : "Mobile Money"}{" "}
          Information
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {type === EChannel.MOBILE_MONEY ? (
            <Input
              error={errors.accountNumber?.message}
              label="Mobile Number"
              onChange={(e) =>
                setValue("accountNumber", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              value={watch("accountNumber")}
            />
          ) : (
            <>
              <Select
                error={errors.bankCode?.message}
                isLoading={isLoadingBanks}
                label="Bank Name"
                onChange={(e) =>
                  setValue("bankCode", e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                value={watch("bankCode")}
                placeholder=" Select Bank"
              >
                {banks?.data.map((bank) => (
                  <option key={bank.id} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
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
            <Button
              isLoading={isUpdatingAccount || isAddingAccount}
              className="w-fit"
              disabled={!isDirty}
            >
              Save
            </Button>
            <Button
              disabled={isUpdatingAccount || isAddingAccount}
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
