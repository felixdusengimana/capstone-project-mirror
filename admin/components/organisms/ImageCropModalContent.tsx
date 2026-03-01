import { readFile } from "@/utils/cropImage";
import { useImageCropContext } from "@/providers/ImageCropProvider";
import { ChangeEvent } from "react";
import { RotationSlider, ZoomSlider } from "./Sliders";
import Cropper from "./Cropper";
import Button from "../atoms/Button";

interface ImageCropModalContentProps {
  handleDone: () => void;
  handleClose: () => void;
}

const ImageCropModalContent: React.FC<ImageCropModalContentProps> = ({
  handleDone,
  handleClose,
}) => {
  const { setImage } = useImageCropContext();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      if (typeof imageDataUrl === "string") {
        setImage(imageDataUrl);
      }
    }
  };

  return (
    <div className="text-center relative">
      <h5 className="text-gray-800 mb-4">Edit profile picture</h5>
      <div className="border border-dashed border-gray-200 p-6 rounded-lg">
        <div className="flex justify-center">
          <div className="crop-container mb-4">
            <Cropper />
          </div>
        </div>
        <ZoomSlider className="mb-4" />
        <RotationSlider className="mb-4" />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="avatarInput"
          accept="image/*"
        />

        <label
          className="block border border-gray-200 rounded-full lg:px-8 px-6 lg:py-4 py-2 shadow w-full mb-4 text-gray-800 hover:shadow-lg"
          htmlFor="avatarInput"
        >
          Upload Another Picture
        </label>
        <div className="flex gap-2">
          <Button onClick={handleClose} variant="danger">
            Cancel
          </Button>
          <Button variant="secondary" className="w-full" onClick={handleDone}>
            Done & Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModalContent;
