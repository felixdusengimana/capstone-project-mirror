import { describe, it, expect } from "vitest";
import { ObjectToParams, ParamsToObject } from "./params";

describe("ObjectToParams", () => {
  it("joins key/value pairs with &", () => {
    expect(ObjectToParams({ a: 1, b: "x" })).toBe("a=1&b=x");
  });

  it("returns empty string for empty object", () => {
    expect(ObjectToParams({})).toBe("");
  });
});

describe("ParamsToObject", () => {
  it("parses a query string into an object", () => {
    expect(ParamsToObject("a=1&b=x")).toEqual({ a: "1", b: "x" });
  });

  it("round-trips with ObjectToParams", () => {
    expect(ParamsToObject(ObjectToParams({ page: 2, size: 10 }))).toEqual({
      page: "2",
      size: "10",
    });
  });
});
