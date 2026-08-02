import { EChannel } from "@/types";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import WithdrawOptionsForm from "./WithdrawOptionsForm";
import { useGetWithdrawAccounts } from "@/services/withdrawal-accounts";
import { IWithdrawalAccount } from "@/types/withdrawal-accounts";
import { useTranslations } from "next-intl";

export default function WithdrawOptions() {
  const t = useTranslations("components");
  const common = useTranslations("common");
  const { data: accounts, isPending: isLoadingAccounts } =
    useGetWithdrawAccounts({});
  const phone = accounts?.data.find(
    (account) => account.accountType === EChannel.MOBILE_MONEY
  );

  const bank = accounts?.data.find(
    (account) => account.accountType === EChannel.BANK_ACCOUNT
  );

  return (
    <form className="max-w-[900px] bg-white px-10 lg:px-[67px] py-[55px] w-full rounded-lg mt-8 ">
      <h1 className="font-medium text-gray-600 text-lg">{t("withdrawOptions")}</h1>

      <div className="mt-5">
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="text-[#64748A] text-sm font-normal block mb-2"
          >
            1. {t("mobileMoney")}
          </label>

          {phone && (
            <WithdrawOptionsForm
              initialData={{
                id: phone?.id,
                accountNumber: phone?.accountNumber,
              }}
              trigger={<button type="button">{common("edit")}</button>}
              type={EChannel.MOBILE_MONEY}
            />
          )}
        </div>

        {!phone && !isLoadingAccounts ? (
          <WithdrawOptionsForm
            trigger={
              <Button type="button">
                <Icon name="add" />
                <span className="text-sm">{t("addMobile")}</span>
              </Button>
            }
            type={EChannel.MOBILE_MONEY}
          />
        ) : (
          <label
            htmlFor=""
            className="text-[#64748A] text-sm font-normal block mb-2"
          >
            {t("mobileNumber")}:{" "}
            <span className="font-bold">{phone?.accountNumber}</span>
          </label>
        )}
      </div>

      <div className="mt-5">
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="text-[#64748A] text-sm font-normal block mb-2"
          >
            2. {t("bankAccount")}
          </label>

          {bank && (
            <WithdrawOptionsForm
              initialData={{
                id: bank?.id,
                accountName: bank?.accountName,
                accountNumber: bank?.accountNumber,
                bankCode: bank?.bank?.code,
                accountType: bank?.accountType,
              }}
              trigger={<button type="button">{common("edit")}</button>}
              type={EChannel.BANK_ACCOUNT}
            />
          )}
        </div>

        {!bank && !isLoadingAccounts ? (
          <WithdrawOptionsForm
            trigger={
              <Button type="button">
                <Icon name="add" />
                <span className="text-sm">{t("addBank")}</span>
              </Button>
            }
            type={EChannel.BANK_ACCOUNT}
          />
        ) : (
          <div>
            <label
              htmlFor=""
              className="text-[#64748A] text-sm font-normal block mb-2"
            >
              {t("bankName")}: <span className="font-bold">{bank?.bank?.name}</span>
            </label>

            <label
              htmlFor=""
              className="text-[#64748A] text-sm font-normal block mb-2"
            >
              {t("accountNumber")}:{" "}
              <span className="font-bold">{bank?.accountNumber}</span>
            </label>

            <label
              htmlFor=""
              className="text-[#64748A] text-sm font-normal block mb-2"
            >
              {t("accountName")}:{" "}
              <span className="font-bold">{bank?.accountName}</span>
            </label>
          </div>
        )}
      </div>
    </form>
  );
}
