import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import rw from "@/messages/rw.json";
import fr from "@/messages/fr.json";
import { defaultLocale, isAppLocale, localeCookie, locales } from "./config";

type MessageValue = string | MessageValue[] | { [key: string]: MessageValue };

function collectStrings(value: MessageValue, path = ""): Record<string, string> {
  const messages: Record<string, string> = {};

  if (typeof value === "string") {
    messages[path] = value;
    return messages;
  }

  const entries = Array.isArray(value)
    ? value.map((item, index) => [String(index), item] as const)
    : Object.entries(value);

  for (const [key, child] of entries) {
    const childPath = path ? `${path}.${key}` : key;
    Object.assign(messages, collectStrings(child, childPath));
  }

  return messages;
}

function placeholders(message: string) {
  return (message.match(/\{[^}]+\}/g) ?? [])
    .map((match) => match.slice(1, -1))
    .sort();
}

describe("localization configuration", () => {
  it("supports English, Kinyarwanda, and French with a stable cookie", () => {
    expect(locales).toEqual(["en", "rw", "fr"]);
    expect(defaultLocale).toBe("en");
    expect(localeCookie).toBe("NEXT_LOCALE");
    expect(isAppLocale("en")).toBe(true);
    expect(isAppLocale("rw")).toBe(true);
    expect(isAppLocale("fr")).toBe(true);
    expect(isAppLocale("de")).toBe(false);
  });
});

describe("translation catalogs", () => {
  const english = collectStrings(en as MessageValue);

  it.each([
    ["Kinyarwanda", rw],
    ["French", fr],
  ])("keeps every English message in %s", (_name, catalog) => {
    const translated = collectStrings(catalog as MessageValue);
    expect(Object.keys(translated).sort()).toEqual(Object.keys(english).sort());

    for (const [path, message] of Object.entries(translated)) {
      expect(message.trim(), `${path} must not be empty`).not.toBe("");
      expect(placeholders(message), `${path} must preserve variables`).toEqual(
        placeholders(english[path] ?? "")
      );
    }
  });
});
