import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Headline from "@/components/atoms/Headline";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import React from "react";

export default function page() {
  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-10">
      <Headline className="text-4xl font-sans font-bold text-[#1A1A1A]">
        Settings
      </Headline>
      <div className="max-w-[900px] bg-white px-[67px] py-[55px] w-full rounded-lg mt-8 flex gap-28 justify-between items-start">
        <div className="max-w-[307px]">
          <label htmlFor="upload-profile-photo">
            <Avatar src="" size="2xl" />
            <div className="mt-6 text-xlfont-normal rounded-full border border-gray-200 flex gap-1 px-4 py-3">
              <Icon name="camera" />
              <p>Upload Profile</p>
            </div>
          </label>

          <input
            type="file"
            accept=".png;.jpg;.jpeg"
            hidden
            id="upload-profile-photo"
          />
        </div>
        <div className="flex flex-grow flex-col gap-4">
          <Input label="Your name" value={"Nziranziza Rafael"} />
          <TextArea label="Bio">
            Hey, I&apos;m Manzi Olivier, a product designer on a mission to
            create tech magic! I whip up interfaces that people adore and
            sprinkle pixel-perfect details everywhere
          </TextArea>
          <Input label="Email" value={"nhmanzk001@gmail.com"} />
          <Input label="Phone" value={"07885496697"} />
        </div>
      </div>

      <div className="max-w-[900px] bg-white px-[67px] py-[55px] w-full rounded-lg mt-8 flex gap-[107px] justify-between items-start">
        <p className="flex-grow font-medium text-lg text-gray-600">
          Social Links
        </p>
        <div className="flex flex-col gap-4 min-w-[486px]">
          <Input
            label="Instagram"
            className="mt-10"
            value={"https://www.instagram.com/theBen007/"}
            left={
              <Icon width={20} height={20} name="instagram" className="mr-2" />
            }
          />
          <Input
            label="Facebook"
            className="mt-10"
            value={"https://www.facebook.com/theBen007/"}
            left={
              <Icon width={20} height={20} name="facebook" className="mr-2" />
            }
          />
          <Input
            label="Twitter"
            className="mt-10"
            value={"https://www.x.com/theBen007/"}
            left={<Icon width={20} height={20} name="x" className="mr-2" />}
          />
        </div>
      </div>

      <div className="max-w-[900px] mb-10 bg-white px-[67px] py-[55px] w-full rounded-lg mt-8 flex gap-[107px] justify-between items-start">
        <div className="max-w-[413px]">
          <h1 className="font-medium text-gray-600 text-lg">Delete account</h1>
          <p className="font-normal text-gray-400 text-base">
            Your account, along with all associated data will be permanently
            deleted and cannot be restored.
          </p>
        </div>
        <Button variant="danger-reverse">Delete my account</Button>
      </div>
    </div>
  );
}
