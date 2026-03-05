import { useState, ReactNode } from "react";
import Dialog, { DialogRoot, DialogTrigger } from "../molecules/Dialog";
import Button from "../atoms/Button";
import { useMutation } from "@tanstack/react-query";
import { DeleteProfileAccount } from "@/services/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "../atoms/Input";

interface IDeleteAccountProps {
  trigger?: ReactNode;
  pesaTag?: string;
}
const DeleteAccount = ({ trigger, pesaTag }: IDeleteAccountProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pesaTagValue, setPesaTagValue] = useState<string>("");
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: DeleteProfileAccount,
    onSuccess: () => {
      toast.success(
        "Account deleted successfully, We are sorry to see you go!"
      );

      //   clear cookies
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "pesatoneMiddleMan=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      router?.replace("/login");
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong");
    },
  });

  return (
    <DialogRoot open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        {trigger ?? <Button variant="danger-reverse">Delete my account</Button>}
      </DialogTrigger>
      <Dialog className="p-4">
        <form className="flex flex-col gap-5">
          <p className="text-gray-800 font-bold text-2xl">Delete Account</p>
          <p className="text-gray-800">
            Are you sure you want to delete your account?
          </p>
          <Input
            placeholder="Enter your PesaTag to confirm"
            label="PesaTag"
            value={pesaTagValue}
            onChange={(e) => {
              setPesaTagValue(e.target.value);
              setError(null);
            }}
            error={error}
          />
          <div className="flex gap-4">
            <Button
              type="button"
              disabled={isPending}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              isLoading={isPending}
              variant="danger"
              onClick={() => {
                if (pesaTagValue !== pesaTag) {
                  setError("PesaTag does not match");
                  return;
                }
                setError("");
                mutate();
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </form>
      </Dialog>
    </DialogRoot>
  );
};

export default DeleteAccount;
