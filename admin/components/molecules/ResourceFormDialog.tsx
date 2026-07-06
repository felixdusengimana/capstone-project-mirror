"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Icon from "../atoms/Icon";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import {
  CreateBank,
  CreateCountry,
  CreateIndustry,
  UpdateBank,
  UpdateCountry,
  UpdateIndustry,
} from "@/services/resources";
import {
  CURRENCIES,
  IBank,
  ICountry,
  IIndustry,
  ResourceType,
} from "@/types/resources";
import { slugifyCode } from "@/utils/code";

type ResourceRecord = IIndustry | ICountry | IBank;

interface ResourceFormDialogProps {
  resourceType: ResourceType;
  trigger: React.ReactNode;
  /** When provided, the dialog is in edit mode */
  initial?: ResourceRecord;
  /** Active countries, required for the bank form's country select */
  countries?: ICountry[];
}

const LABELS: Record<ResourceType, string> = {
  industries: "Industry",
  countries: "Country",
  banks: "Bank",
};

const emptyForm = {
  name: "",
  code: "",
  isoCode: "",
  countryCode: "",
  currency: "RWF",
  countryIsoCode: "",
};

export default function ResourceFormDialog({
  resourceType,
  trigger,
  initial,
  countries = [],
}: ResourceFormDialogProps) {
  const isEdit = Boolean(initial);
  const label = LABELS[resourceType];
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const buildInitialForm = () => ({
    ...emptyForm,
    ...(initial ?? {}),
    currency: (initial as ICountry)?.currency ?? "RWF",
    countryIsoCode: (initial as IBank)?.countryIsoCode ?? "",
  });

  const [form, setForm] = useState(buildInitialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // The code is auto-generated (read-only) from the name for industries and banks
  const autoGenerateCode =
    resourceType === "industries" || resourceType === "banks";

  // Reset the form to the record (or blank) every time the dialog opens
  useEffect(() => {
    if (open) {
      setForm(buildInitialForm());
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      // code always follows the name for auto-generated types
      code: autoGenerateCode ? slugifyCode(value) : prev.code,
    }));
    setErrors((prev) => ({
      ...prev,
      name: "",
      ...(autoGenerateCode ? { code: "" } : {}),
    }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (resourceType === "countries") {
      if (!form.isoCode.trim()) next.isoCode = "ISO code is required";
      if (!form.currency) next.currency = "Currency is required";
    } else {
      if (!form.code.trim()) next.code = "Code is required";
    }
    if (resourceType === "banks" && !form.countryIsoCode) {
      next.countryIsoCode = "Country is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildPayload = () => {
    if (resourceType === "industries") {
      return { name: form.name.trim(), code: form.code.trim() };
    }
    if (resourceType === "countries") {
      return {
        name: form.name.trim(),
        isoCode: form.isoCode.trim(),
        countryCode: form.countryCode.trim(),
        currency: form.currency as ICountry["currency"],
      };
    }
    return {
      name: form.name.trim(),
      code: form.code.trim(),
      countryIsoCode: form.countryIsoCode,
    };
  };

  const submit = () => {
    const payload = buildPayload();
    const id = initial?.id as number;
    switch (resourceType) {
      case "industries":
        return isEdit
          ? UpdateIndustry(id, payload as any)
          : CreateIndustry(payload as any);
      case "countries":
        return isEdit
          ? UpdateCountry(id, payload as any)
          : CreateCountry(payload as any);
      case "banks":
        return isEdit
          ? UpdateBank(id, payload as any)
          : CreateBank(payload as any);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourceType] });
      toast.success(`${label} ${isEdit ? "updated" : "created"} successfully`);
      setOpen(false);
    },
    onError: (e: any) =>
      toast.error(e?.message ?? `Failed to ${isEdit ? "update" : "create"} ${label.toLowerCase()}`),
  });

  const handleSubmit = () => {
    if (validate()) mutate();
  };

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <Dialog preventCloseOnClickOutside={isPending} className="pt-4 min-w-[443px]">
        <div className="w-full py-6">
          <div className="flex items-center justify-between px-6">
            <h1 className="text-[#000000] font-medium text-lg">
              {isEdit ? `Edit ${label}` : `Add ${label}`}
            </h1>
            <Icon
              name="close"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            />
          </div>
          <div className="bg-[#E5E9F0] h-[1px] w-full my-6" />

          <div className="px-6 flex flex-col gap-4">
            <Input
              label="Name"
              placeholder={`${label} name`}
              value={form.name}
              error={errors.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />

            {resourceType === "countries" && (
              <>
                <Input
                  label="ISO Code"
                  placeholder="e.g. RWA"
                  value={form.isoCode}
                  error={errors.isoCode}
                  onChange={(e) => setField("isoCode", slugifyCode(e.target.value))}
                />
                <Input
                  label="Dialing Code"
                  placeholder="e.g. +250"
                  value={form.countryCode}
                  onChange={(e) => setField("countryCode", e.target.value)}
                />
                <Select
                  label="Currency"
                  value={form.currency}
                  error={errors.currency}
                  onChange={(e) => setField("currency", e.target.value)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </>
            )}

            {resourceType === "banks" && (
              <Select
                label="Country"
                placeholder="Select a country"
                value={form.countryIsoCode}
                error={errors.countryIsoCode}
                onChange={(e) => setField("countryIsoCode", e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </Select>
            )}

            <div className="w-fit ml-auto flex gap-2.5 mt-2">
              <Button
                onClick={() => setOpen(false)}
                disabled={isPending}
                variant="gray"
                size="lg"
                className="text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                isLoading={isPending}
                variant="dark"
                size="lg"
                className="text-sm"
              >
                {isEdit ? "Save changes" : `Add ${label.toLowerCase()}`}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
