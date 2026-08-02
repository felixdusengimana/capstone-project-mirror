"use client";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Button from "../atoms/Button";
import { IUser } from "@/types/user";
import PesatoneTipCard from "../organisms/TipCard";
import { useTranslations } from "next-intl";

export default function ShareProfile({
  trigger,
  profile,
}: {
  trigger?: React.ReactNode;
  profile?: IUser;
}) {
  const t = useTranslations("components");

  return (
    <DialogRoot>
      <DialogTrigger>
        <div>
          {trigger ?? (
            <Button className="flex gap-0.5 px-2 py-0 items-center">
              <p className="font-medium text-xs md:text-sm text-white">
                {t("shareProfile")}
              </p>
            </Button>
          )}
        </div>
      </DialogTrigger>
      <Dialog showCloseButton={true} className="p-4 pb-10 overflow-visible bg-[#d6d8dd]">
        <PesatoneTipCard profile={profile!}/>
      </Dialog>
    </DialogRoot>
  );
}
