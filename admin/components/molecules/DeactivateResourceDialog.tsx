"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Icon from "../atoms/Icon";
import {
  DeactivateBank,
  DeactivateCountry,
  DeactivateIndustry,
} from "@/services/resources";
import { ResourceType } from "@/types/resources";

interface DeactivateResourceDialogProps {
  resourceType: ResourceType;
  id: number;
  name: string;
  trigger: React.ReactNode;
}

const LABELS: Record<ResourceType, string> = {
  industries: "industry",
  countries: "country",
  banks: "bank",
};

export default function DeactivateResourceDialog({
  resourceType,
  id,
  name,
  trigger,
}: DeactivateResourceDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const label = LABELS[resourceType];

  const deactivate = () => {
    switch (resourceType) {
      case "industries":
        return DeactivateIndustry(id);
      case "countries":
        return DeactivateCountry(id);
      case "banks":
        return DeactivateBank(id);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deactivate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourceType] });
      toast.success(`${name} deactivated`);
      setOpen(false);
    },
    onError: (e: any) =>
      toast.error(e?.message ?? `Failed to deactivate ${label}`),
  });

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <Dialog preventCloseOnClickOutside={isPending} className="pt-4 min-w-[443px]">
        <div className="w-full py-6">
          <div className="flex items-center justify-between px-6">
            <h1 className="text-[#000000] font-medium text-lg">
              Deactivate {label}
            </h1>
            <Icon
              name="close"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            />
          </div>
          <div className="bg-[#E5E9F0] h-[1px] w-full my-6" />
          <div className="px-6">
            <p className="text-[#4D5E80]">
              Are you sure you want to deactivate{" "}
              <span className="font-medium text-gray-900">{name}</span>? It will
              no longer appear in the app until re-added.
            </p>
            <div className="w-fit ml-auto flex gap-2.5 mt-6">
              <button
                onClick={() => mutate()}
                disabled={isPending}
                className="bg-[#EF4444] border-[#EF4444] flex gap-1 items-center flex-grow border text-center text-white font-normal rounded-md px-4 py-2 text-sm"
              >
                {isPending && (
                  <div className="w-3 h-3 rounded-full border border-t-0 border-gray-200 animate-spin" />
                )}
                Deactivate
              </button>
              <button
                disabled={isPending}
                onClick={() => setOpen(false)}
                className="bg-gray-50 flex-grow border text-center border-gray-200 text-[#0000008A] font-normal rounded-md px-4 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
