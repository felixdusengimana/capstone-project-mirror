import { useState, ReactNode } from "react";
import Dialog, { DialogRoot, DialogTrigger } from "../molecules/Dialog";
import Button from "../atoms/Button";
import { useMutation } from "@tanstack/react-query";
import { DeleteProfileAccount } from "@/services/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IDeleteAccountProps {
  trigger?: ReactNode;
}
const DeleteAccount = ({ trigger }: IDeleteAccountProps) => {
  const [openModal, setOpenModal] = useState(false);
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
        <div className="flex flex-col gap-5">
          <p className="text-gray-800 font-bold text-2xl">Delete Account</p>
          <p className="text-gray-800">
            Are you sure you want to delete your account?
          </p>
          <div className="flex gap-4">
            <Button disabled={isPending} onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button
              isLoading={isPending}
              variant="danger"
              onClick={() => mutate()}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </DialogRoot>
  );
};

export default DeleteAccount;
