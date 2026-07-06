import { describe, it, expect } from "vitest";
import { supportedSocials } from "./socials";

describe("supportedSocials", () => {
  it("includes the core platforms", () => {
    ["facebook", "x", "instagram", "tiktok", "linkedin"].forEach((s) =>
      expect(supportedSocials).toContain(s)
    );
  });

  it("has no duplicates", () => {
    expect(new Set(supportedSocials).size).toBe(supportedSocials.length);
  });
});
