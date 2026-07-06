"use client";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { Table, THead, TBody, Tr, Td, Th } from "@/components/molecules/CustomTable";
import ResourceFormDialog from "@/components/molecules/ResourceFormDialog";
import DeactivateResourceDialog from "@/components/molecules/DeactivateResourceDialog";
import {
  useGetAllBanks,
  useGetAllCountries,
  useGetAllIndustries,
} from "@/services/resources";
import { IBank, ICountry, IIndustry, ResourceType } from "@/types/resources";

const TABS: { key: ResourceType; label: string; singular: string }[] = [
  { key: "industries", label: "Industries", singular: "industry" },
  { key: "countries", label: "Countries", singular: "country" },
  { key: "banks", label: "Banks", singular: "bank" },
];

export default function ConfigurationsPage() {
  const [activeTab, setActiveTab] = useState<ResourceType>("industries");

  const industries = useGetAllIndustries({ enabled: true });
  const countries = useGetAllCountries({ enabled: true });
  const banks = useGetAllBanks({ enabled: true });

  const countryList = countries.data?.data ?? [];

  const current = {
    industries,
    countries,
    banks,
  }[activeTab];

  const isLoading = current.isPending;
  const rows = current.data?.data ?? [];

  const headers: Record<ResourceType, string[]> = {
    industries: ["Name", "Code", ""],
    countries: ["Name", "ISO Code", "Dialing Code", "Currency", ""],
    banks: ["Name", "Code", "Country", ""],
  };

  const renderCells = (row: IIndustry | ICountry | IBank) => {
    if (activeTab === "industries") {
      const r = row as IIndustry;
      return (
        <>
          <Td className="font-medium">{r.name}</Td>
          <Td>{r.code}</Td>
        </>
      );
    }
    if (activeTab === "countries") {
      const r = row as ICountry;
      return (
        <>
          <Td className="font-medium">{r.name}</Td>
          <Td>{r.isoCode}</Td>
          <Td>{r.countryCode || "—"}</Td>
          <Td>{r.currency}</Td>
        </>
      );
    }
    const r = row as IBank;
    return (
      <>
        <Td className="font-medium">{r.name}</Td>
        <Td>{r.code}</Td>
        <Td>{r.countryName || "—"}</Td>
      </>
    );
  };

  const colCount = headers[activeTab].length;

  return (
    <div className="w-full px-10 bg-gray-200 min-h-screen">
      <div className="w-full max-w-[1124px] mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Configurations</h1>
          <ResourceFormDialog
            resourceType={activeTab}
            countries={countryList}
            trigger={
              <Button variant="dark" size="lg" className="text-sm gap-2">
                <Icon name="add" fill="#fff" />
                Add {TABS.find((t) => t.key === activeTab)?.singular}
              </Button>
            }
          />
        </div>

        <div className="w-full bg-white rounded-lg mt-8">
          {/* Tabs */}
          <div className="flex px-3 border-b border-[#E5E9F0]">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`${
                  activeTab === tab.key
                    ? "text-black border border-b-2 -mb-[1px] border-b-white"
                    : "text-[#9CA3AF] border-b-0"
                } cursor-pointer p-3 rounded-t-lg font-medium text-sm bg-white`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <Table>
            <THead>
              <Tr>
                {headers[activeTab].map((h, i) => (
                  <Th key={i} className={i === colCount - 1 ? "text-right" : ""}>
                    {h || "Actions"}
                  </Th>
                ))}
              </Tr>
            </THead>
            <TBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Tr key={i} className="hover:bg-transparent">
                    {Array.from({ length: colCount }).map((_, j) => (
                      <Td key={j}>
                        <div className="h-2 bg-gray-200 w-1/2 animate-pulse" />
                      </Td>
                    ))}
                  </Tr>
                ))
              ) : rows.length === 0 ? (
                <Tr className="hover:bg-inherit">
                  <Td colSpan={colCount} className="text-center text-xs capitalize">
                    No {activeTab} yet
                  </Td>
                </Tr>
              ) : (
                rows.map((row) => (
                  <Tr key={row.id}>
                    {renderCells(row)}
                    <Td className="text-right">
                      <div className="flex gap-2 justify-end items-center">
                        <ResourceFormDialog
                          resourceType={activeTab}
                          initial={row}
                          countries={countryList}
                          trigger={
                            <button className="text-xs font-medium text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50">
                              Edit
                            </button>
                          }
                        />
                        <DeactivateResourceDialog
                          resourceType={activeTab}
                          id={row.id}
                          name={row.name}
                          trigger={
                            <button className="flex items-center justify-center text-red-500 border border-red-100 rounded-md p-1.5 hover:bg-red-50">
                              <Icon name="trash" fill="#EF4444" />
                            </button>
                          }
                        />
                      </div>
                    </Td>
                  </Tr>
                ))
              )}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
