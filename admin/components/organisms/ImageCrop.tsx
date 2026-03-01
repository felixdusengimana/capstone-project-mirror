import { useState, ChangeEvent } from "react";
import { readFile } from "@/utils/cropImage";
import { useImageCropContext } from "@/providers/ImageCropProvider";
import ImageCropModalContent from "./ImageCropModalContent";
import Dialog, { DialogRoot, DialogTrigger } from "../molecules/Dialog";
import Avatar from "../atoms/Avatar";
import Icon from "../atoms/Icon";

interface IImageCropProps {
  defaultImage: string;
  disabled?: boolean;
  callbackOnDone?: (avatar: File) => void;
}
const ImageCrop = ({
  defaultImage,
  disabled,
  callbackOnDone,
}: IImageCropProps) => {
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
        <div className="max-w-[307px]">
          <label htmlFor="upload-profile-photo">
            <Avatar
              src={Boolean(preview) ? preview : defaultImage ?? ""}
              size="2xl"
            />
            <div className="mt-6 text-xlfont-normal rounded-full border border-gray-200 flex gap-1 px-4 py-3">
              <Icon name="camera" />
              <p>Upload Profile</p>
            </div>
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
