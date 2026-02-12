"use client";
import { useGetMe } from "@/services/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResolveScreen() {
  const router = useRouter();
  const { data: user, isLoading } = useGetMe();

  useEffect(() => {
    const resolver = () => {
      if (!isLoading) {
        const info = user?.data;
        if (!info?.id) return router.replace("/login");
        const step = !info?.bio
          ? 1
          : !info.username
          ? 2
          : !info.countryName
          ? 3
          : info.socialLinks?.length <= 0
          ? 4
          : -1;
        if (step === -1) return router.replace("/dashboard");

        return router.replace(`/join?step=${step}`);
      }
    };
    resolver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="h-screen w-full">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    </div>
  );
}
