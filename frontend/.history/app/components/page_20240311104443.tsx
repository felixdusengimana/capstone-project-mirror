import Button from "@/components/atoms/Button";
import React from "react";

export default function page() {
  return (
    <div className="p-10">
      <div>
        <h1>Button</h1>
        <Button variant="secondary">Click me</Button>
      </div>
      <div></div>
    </div>
  );
}
