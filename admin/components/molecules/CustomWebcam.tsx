/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "../atoms/Button";
import { usePathname, useRouter } from "next/navigation";

export default function CustomWebcam() {
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
