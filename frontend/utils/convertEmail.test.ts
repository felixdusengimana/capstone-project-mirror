import { describe, it, expect } from "vitest";
import { convertEmail } from "./convertEmail";

describe("convertEmail", () => {
  it("masks the middle of the local part", () => {
    expect(convertEmail("felix@example.com")).toBe("f***x@example.com");
  });

  it("leaves 2-char local parts unmasked (nothing between first and last)", () => {
    expect(convertEmail("ab@x.com")).toBe("ab@x.com");
  });

  it("returns falsy input unchanged", () => {
    expect(convertEmail("")).toBe("");
  });
});
