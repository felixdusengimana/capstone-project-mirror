import Intro from "@/components/organisms/Intro";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="py-[73px]">
      <Navbar />
      <Intro />
      <div>
        <h5>features</h5>
      </div>
    </div>
  );
}
