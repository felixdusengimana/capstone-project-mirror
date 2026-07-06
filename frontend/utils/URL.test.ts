import { describe, it, expect } from "vitest";
import { isValidURL, extractDomainFromURL, ensureHttps, removeProtocol } from "./URL";

describe("isValidURL", () => {
  it("accepts http(s) and bare domains", () => {
    expect(isValidURL("https://google.com")).toBe(true);
    expect(isValidURL("google.com")).toBe(true);
    expect(isValidURL("www.youtube.com/watch")).toBe(true);
  });
  it("rejects non-urls", () => {
    expect(isValidURL("not a url")).toBe(false);
    expect(isValidURL("hello")).toBe(false);
  });
});

describe("extractDomainFromURL", () => {
  it("pulls the main domain name", () => {
    expect(extractDomainFromURL("https://twitter.com/felix")).toBe("twitter");
    expect(extractDomainFromURL("www.youtube.com")).toBe("youtube");
    expect(extractDomainFromURL("instagram.com")).toBe("instagram");
  });
  it("returns null for invalid input", () => {
    expect(extractDomainFromURL("nonsense")).toBeNull();
  });
});

describe("ensureHttps / removeProtocol", () => {
  it("adds https when missing", () => {
    expect(ensureHttps("google.com")).toBe("https://google.com");
    expect(ensureHttps("https://x.com")).toBe("https://x.com");
  });
  it("strips the protocol", () => {
    expect(removeProtocol("https://x.com/a")).toBe("x.com/a");
  });
});
