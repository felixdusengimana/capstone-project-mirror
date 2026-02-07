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
      <div>
        <h1>Header</h1>
        <Headline>Header</Headline>
      </div>
    </div>
  );
}
