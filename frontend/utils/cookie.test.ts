import { describe, it, expect, beforeEach } from "vitest";
import { setCookie, getCookie, removeCookie } from "./cookie";

describe("cookie helpers", () => {
  beforeEach(() => {
    // clear any cookies between tests
    document.cookie.split("; ").forEach((c) => {
      const name = c.split("=")[0];
      if (name) removeCookie(name);
    });
  });

  it("sets and reads a cookie", () => {
    setCookie("token", "abc123", null);
    expect(getCookie("token")).toBe("abc123");
  });

  it("returns null for a missing cookie", () => {
    expect(getCookie("nope")).toBeNull();
  });

  it("removes a cookie", () => {
    setCookie("temp", "v", null);
    removeCookie("temp");
    expect(getCookie("temp")).toBeNull();
  });

  it("honors an expiry without throwing", () => {
    expect(() => setCookie("exp", "v", 3600)).not.toThrow();
    expect(getCookie("exp")).toBe("v");
  });
});
