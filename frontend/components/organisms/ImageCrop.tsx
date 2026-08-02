import { useState, ChangeEvent } from "react";
import { readFile } from "@/utils/cropImage";
import { useImageCropContext } from "@/providers/ImageCropProvider";
import ImageCropModalContent from "./ImageCropModalContent";
import Dialog, { DialogRoot, DialogTrigger } from "../molecules/Dialog";
import Avatar from "../atoms/Avatar";
import Icon from "../atoms/Icon";
import { error } from "console";
import { useTranslations } from "next-intl";

interface IImageCropProps {
  defaultImage: string;
  disabled?: boolean;
  error?: string;
  avatarSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "sxl";
  callbackOnDone?: (avatar: File) => void;
}
const ImageCrop = ({
  defaultImage,
  disabled,
  callbackOnDone,
  error,
  avatarSize = "2xl",
}: IImageCropProps) => {
  const t = useTranslations("components");
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  const handleDone = async () => {
    const avatar = await getProcessedImage();
    if (avatar) {
      setPreview(window.URL.createObjectURL(avatar));
      callbackOnDone?.(avatar);
    }
    resetStates();
    setOpenModal(false);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      if (typeof imageDataUrl === "string") {
        setImage(imageDataUrl);
        setOpenModal(true);
      }
    }
  };

  return (
    <DialogRoot open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        <div className="max-w-[307px] w-full">
          <label
            htmlFor="upload-profile-photo"
            className="flex flex-col items-center"
          >
            <Avatar
              src={Boolean(preview) ? preview : defaultImage ?? ""}
              size={avatarSize}
            />
            <div
              className={`mt-6 text-xl font-normal rounded-full border ${
                error ? "border-red-400" : "border-gray-200"
              } flex items-center justify-center gap-1 px-4 py-3 w-full`}
            >
              <Icon name="camera" />
              <p>{t("uploadProfile")}</p>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </label>

          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={handleFileChange}
            id="upload-profile-photo"
            disabled={disabled}
          />
        </div>
      </DialogTrigger>
      <Dialog>
        <ImageCropModalContent
          handleDone={handleDone}
          handleClose={() => setOpenModal(false)}
        />
      </Dialog>
    </DialogRoot>
  );
};

export default ImageCrop;
