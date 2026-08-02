// @ts-nocheck
import React from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useTranslations } from "next-intl";

export default function DateRange({
  onChange,
  initialValue,
}: {
  onChange?: (startDate: string, endDate: string) => void;
  initialValue?: { startDate?: string; endDate?: string };
}) {
  const t = useTranslations("components");
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateRangePicker
        label={t("fromTo")}
        maxValue={today(getLocalTimeZone())}
        visibleMonths={2}
        pageBehavior="single"
        defaultValue={
          initialValue?.startDate && initialValue.endDate
            ? {
                start: parseDate(initialValue?.startDate.replaceAll("/", "-")),
                end: parseDate(initialValue?.endDate.replaceAll("/", "-")),
              }
            : undefined
        }
        onChange={(date) => {
          const start = date?.start;
          const end = date?.end;

          if (start && end) {
            const startDate = new Date(
              start.year,
              start.month - 1,
              start.day
            ).toLocaleDateString();
            const endDate = new Date(
              end.year,
              end.month - 1,
              end.day
            ).toLocaleDateString();

            onChange?.(startDate, endDate);
          }
        }}
      />
    </div>
  );
}

// <div className="bg-gray-50 border border-white text-[#0000008A] font-normal items-center gap-2 cursor-pointer rounded-md px-4 py-2 text-sm flex">
//     <Icon name="calendar" />
//     <p>Sept 1 - Sept 14</p>
//   </div>
