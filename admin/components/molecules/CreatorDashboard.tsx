"use client";

import { useGetCreatorDashboard } from "@/services/creator";
import CardIcon from "./CardIcon";

export default function CreatorDashboard() {
  const { data: dashboard, isLoading: fetchingDashboard } =
    useGetCreatorDashboard({ enabled: true });

  return (
    <div className="w-full grid grid-cols-3 gap-10 items-center">
      {/* Money Earned */}
      <div className="w-full bg-white p-8 rounded-lg">
        <CardIcon icon="coins" className="bg-gray-50" />
        <h3 className="font-medium text-sm text-gray-400 mt-6">Money Earned</h3>
        <h1 className="text-gray-800 font-medium text-4xl mt-4 flex items-center gap-2">
          {fetchingDashboard ? (
            <span className="animate-pulse bg-gray-200 h-6 w-6 block"></span>
          ) : (
            <>
              <span className="font-normal text-base text-gray-400">RWF</span>
            </>
          )}{" "}
          {fetchingDashboard ? (
            <span className="animate-pulse bg-gray-200 h-10 w-20 block"></span>
          ) : (
            <span>
              {dashboard?.data.totalAmountReceived?.toLocaleString() ?? 0}
            </span>
          )}
        </h1>
      </div>

      {/* Supporters */}
      <div className="w-full bg-white p-8 rounded-lg">
        <CardIcon icon="coins" className="bg-gray-50" />
        <h3 className="font-medium text-sm text-gray-400 mt-6">Supporters</h3>
        <div className="mt-4">
          {fetchingDashboard ? (
            <span className="animate-pulse bg-gray-200 h-10 w-20 block"></span>
          ) : (
            <h1 className="text-gray-800 font-medium text-4xl ">
              {dashboard?.data.totalSupporters?.toLocaleString() ?? 0}
            </h1>
          )}
        </div>
      </div>

      {/* Biggest supporter */}
      <div className="w-full bg-white p-8 rounded-lg">
        <CardIcon icon="user-star" className="bg-gray-50" />
        <h3 className="font-medium text-sm text-gray-400 mt-6">
          Single Biggest supporter
        </h3>
        <h1 className="text-gray-800 font-medium text-4xl mt-4 flex items-center gap-2">
          {fetchingDashboard ? (
            <span className="animate-pulse bg-gray-200 h-6 w-6 block"></span>
          ) : (
            <>
              <span className="font-normal text-base text-gray-400">RWF</span>
            </>
          )}{" "}
          {fetchingDashboard ? (
            <span className="animate-pulse bg-gray-200 h-10 w-20 block"></span>
          ) : (
            <span>
              {dashboard?.data.biggestSupporter?.toLocaleString() ?? 0}
            </span>
          )}
        </h1>
      </div>
    </div>
  );
}
