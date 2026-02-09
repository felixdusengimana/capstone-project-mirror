"use client";
import { ComponentProps, useEffect, useState } from "react";
import Icon from "../atoms/Icon";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Profile from "./Profile";
import SearchInput from "./SearchInput";
import Link from "next/link";

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
  const dummyData = [
    {
      name: "Bruce Melodie",
      username: "brucemelodie",
      photo: "/profiles/profile1.png",
      verified: true,
    },
    {
      name: "Queen Cha",
      username: "queencha",
      photo: "/profiles/profile2.png",
      verified: false,
    },
    {
      name: "Riderman",
      username: "riderman",
      photo: "/profiles/profile3.png",
      verified: true,
    },
    {
      name: "Tom Close",
      username: "tomclose",
      photo: "/profiles/profile4.png",
      verified: false,
    },
    {
      name: "Christopher",
      username: "christopher",
      photo: "/profiles/profile1.png",
      verified: true,
    },
    {
      name: "Diamond Platnumz",
      username: "diamondplatnumz",
      photo: "/profiles/profile2.png",
      verified: false,
    },
    {
      name: "Davido",
      username: "davido",
      photo: "/profiles/profile3.png",
      verified: true,
    },
  ];

  const remaining = dummyData.filter(
    (d) =>
      d.name.toLocaleLowerCase().includes(query) ||
      d.username.toLocaleLowerCase().includes(query) ||
      !Boolean(query)
  );

  return (
    <DialogRoot>
      <DialogTrigger>
        <SearchTrigger
          placeholder="Search for creators"
          {...props}
          className={`mt-8 ${className}`}
        />
      </DialogTrigger>
      <Dialog className="pt-4">
        <SearchInput onSearch={(query) => setQuery(query)} />
        <div className="">
          {remaining.length > 0 ? (
            remaining.map((art, i) => (
              <Link
                className="block py-3 px-4 hover:bg-gray-200"
                key={i}
                href={`/creator/${i}`}
              >
                <Profile
                  user={{
                    name: art.name,
                    username: art.username,
                    photo: art.photo,
                  }}
                  verified={i % 2 === 0}
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
