import { describe, it, expect } from "vitest";
import { normalizePhoneNumber } from "./phone";

describe("normalizePhoneNumber", () => {
  it("converts a 250 country-code number to local 0-prefixed", () => {
    expect(normalizePhoneNumber("250788123456")).toBe("0788123456");
  });

  it("handles a +250 number with spaces (non-digits stripped)", () => {
    expect(normalizePhoneNumber("+250 788 123 456")).toBe("0788123456");
  });

  it("keeps an already-local 07 number as-is", () => {
    expect(normalizePhoneNumber("0788123456")).toBe("0788123456");
    expect(normalizePhoneNumber("0788 123 456")).toBe("0788123456");
  });

  it("returns empty string for unrecognized formats", () => {
    expect(normalizePhoneNumber("788123456")).toBe(""); // missing prefix
    expect(normalizePhoneNumber("12345")).toBe("");
    expect(normalizePhoneNumber("")).toBe("");
  });
});
