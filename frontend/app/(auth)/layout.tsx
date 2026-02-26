"use client";

import DownloadApp from "@/components/molecules/DownloadApp";
import Logo from "@/components/molecules/Logo";
import Trusties from "@/components/molecules/Trusties";
import { useParams } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const params = useParams() as { creatorId: string };
  const isCreator = Boolean(params.creatorId);

  return (
    <div className="flex h-screen">
      <div
        className={`flex-grow bg-white ${
          isCreator ? "pt-10 lg:pt-[78px]" : "py-0 pt-20 lg:py-[78px]"
        } px-0 md:px-16 lg:px-[120px] overflow-auto`}
      >
        <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
      </div>
      <div className="max-w-[800px] w-[800px] flex-grow overflow-hidden relative hidden md:block">
        {/* texts */}
        <div className="h-full w-full absolute z-20 bg-transparent px-12 py-[78px] flex flex-col justify-between">
          <div>
            <Logo />
            <h1 className="mt-20 font-mono text-[64px] text-white leading-[79px]">
              {isCreator
                ? "Search and gift your favorite creators"
                : "Give your audience an easy way to say thanks."}
            </h1>
          </div>
          <div className="mt-auto">
            <Trusties className="text-[#fff]" />
            <div className="flex flex-wrap gap-6 mt-6">
              <DownloadApp os="android" transparent />
              <DownloadApp os="ios" transparent />
            </div>
          </div>
        </div>
        {/* gradient */}
        <div
          className="h-full w-full absolute z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.87) 0%, rgba(0, 0, 0, 0) 50.9%, rgba(0, 0, 0, 0) 63.5%, rgba(0, 0, 0, 0.96) 100%)",
          }}
        />
        {/* images */}
        <div className="flex gap-4 bg-[url('/auth-bg.png')] h-full w-full bg-no-repeat bg-cover">
          {/* {Array.from({ length: 5 }).map((_, i) => (
            <Fragment key={i}>
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={`${i}${j}`} className="flex flex-col gap-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Avatar
                      key={`avatar-${i}-${k}`}
                      src={`/profiles/profile${k}.png`}
                      circle={false}
                      size="2xl"
                      className="w-[295px] h-[250px] rounded-[21px]"
                    />
                  ))}
                </div>
              ))}
            </Fragment>
          ))} */}
        </div>
      </div>
    </div>
  );
}
