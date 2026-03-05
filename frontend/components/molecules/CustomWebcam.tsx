/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../atoms/Button";
import { usePathname, useRouter } from "next/navigation";

interface ICustomWebcamProps {
  isUpdatingPic?: boolean;
  updateProfilePic?: (data: FormData) => void;
}

export default function CustomWebcam({
  updateProfilePic,
  isUpdatingPic,
}: ICustomWebcamProps) {
  const router = useRouter();
  const pathName = usePathname();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const retake = () => {
    setImgSrc(null);
  };

  const capture = useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    const data = new FormData();

    // convert imageSrc to binary
    const block = imageSrc.split(";");
    const contentType = block[0].split(":")[1];
    const realData = block[1].split(",")[1];
    const blob = new Blob([atob(realData)], { type: contentType });
    data.append("image", blob);

    updateProfilePic?.(data);

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
        disabled={isUpdatingPic}
        className="w-full mt-8"
        onClick={
          imgSrc
            ? () => {
                router.push(`${pathName}?verify=done`);
              }
            : capture
        }
      >
        {imgSrc ? "Next" : "Take photo"}
      </Button>
    </>
  );
}
