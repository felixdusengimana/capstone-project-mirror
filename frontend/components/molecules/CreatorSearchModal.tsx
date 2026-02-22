"use client";
import { ComponentProps, useEffect, useState } from "react";
import Icon from "../atoms/Icon";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Profile from "./Profile";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { useGetCreators } from "@/services/users";

interface SearchTriggerProps extends ComponentProps<"div"> {
  placeholder?: string;
  stroke?: string;
  placeholderClassName?: string;
}
export function SearchTrigger({
  placeholder = "Search for creators",
  className,
  stroke,
  placeholderClassName = "text-white",
  ...props
}: SearchTriggerProps) {
  return (
    <div
      {...props}
      className={`flex w-full px-5 py-4 gap-4 rounded-full bg-[#2C2C3033] ${className}`}
    >
      <Icon name="search" stroke={stroke} />
      <p
        className={`w-full text-left bg-transparent outline-none ${placeholderClassName}`}
      >
        {placeholder}
      </p>
    </div>
  );
}

export default function CreatorSearchModal({
  className,
  ...props
}: SearchTriggerProps) {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useGetCreators({ name: query });
  const creators = data?.data.results || [];

  return (
    <DialogRoot>
      <DialogTrigger className="w-full">
        <SearchTrigger
          placeholder="Search for creators"
          {...props}
          className={`mt-8 ${className}`}
        />
      </DialogTrigger>
      <Dialog className="pt-4 min-w-[600px]">
        <SearchInput onSearch={(query) => setQuery(query)} />
        <div className="">
          {isLoading ? (
            <p className="text-center text-gray-500 py-4">Loading...</p>
          ) : creators.length > 0 ? (
            creators.map((art, i) => (
              <Link
                className="block py-3 px-4 hover:bg-gray-200"
                key={i}
                href={`/creator/${art.id}`}
              >
                <Profile
                  user={{
                    name: art.name,
                    username: art.username,
                    photo: art.profileImageUrl,
                  }}
                  verified={art.verified}
                />
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No results found</p>
          )}
        </div>
      </Dialog>
    </DialogRoot>
  );
}
