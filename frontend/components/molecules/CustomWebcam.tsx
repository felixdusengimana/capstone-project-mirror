/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../atoms/Button";
import { useTranslations } from "next-intl";

interface ICustomWebcamProps {
  isUpdatingPic?: boolean;
  updateProfilePic?: (data: FormData) => void;
}

export default function CustomWebcam({
  updateProfilePic,
  isUpdatingPic,
}: ICustomWebcamProps) {
  const t = useTranslations("components");
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [file, setFile] = useState<File | null>(null);

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  function blobToFile(blob: Blob, fileName: string) {
    return new File([blob], fileName, { type: blob.type });
  }

  const capture = useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    // Extract the base64 string and MIME type
    const base64String = imageSrc.split(",")[1];
    const mimeType = "image/jpeg";

    // Convert base64 to Blob
    const blob = base64ToBlob(base64String, mimeType);
    const file = blobToFile(blob, "image.png");

    setFile(file);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  // code
  return (
    <>
      <div className="w-full py-6 pb-16 bg-[#fff] rounded-lg border-gray-200 flex items-center justify-center">
        <div className="w-fit rounded-xl">
          {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
          ) : (
            <Webcam height={250} width={250} ref={webcamRef} />
          )}
        </div>
      </div>
      <Button
        isLoading={isUpdatingPic}
        className="w-full mt-8"
        onClick={
          imgSrc && file
            ? () => {
                const data = new FormData();
                data.append("image", file);
                updateProfilePic?.(data);
              }
            : capture
        }
      >
        {imgSrc ? t("photoNext") : t("takePhoto")}
      </Button>
    </>
  );
}
