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
  return (
    <DialogRoot>
      <DialogTrigger>
        <SearchTrigger
          placeholder="Search for creators"
          {...props}
          className={`mt-8 ${className}`}
        />
      </DialogTrigger>
      <Dialog className="py-4">
        <SearchInput />
        <div className="px-4 flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <Link key={i} href={`/creator/${i}`}>
              {" "}
              <Profile
                user={{
                  name: "John Doe",
                  username: "johndoe",
                  photo: `/profiles/profile${(i % 4) + 1}.png`,
                }}
                verified={i % 2 === 0}
              />
            </Link>
          ))}
        </div>
      </Dialog>
    </DialogRoot>
  );
}
