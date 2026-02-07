import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Headline from "@/components/atoms/Headline";
import React from "react";

export default function page() {
  return (
    <div className="p-10">
      <div>
        <h1>Button</h1>
        <Button variant="secondary">Click me</Button>
      </div>
      <div className="bg-black">
        <h1 className="text-white">Header</h1>
        <Headline>Search and gift your favorite creators</Headline>
      </div>
      <div>
        <h1>Avatar</h1>
        <Avatar src="" />
      </div>
    </div>
  );
}
