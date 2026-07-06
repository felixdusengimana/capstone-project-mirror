
export function slugifyCode(value: string): string {
  return value
    .trim() // drop leading/trailing whitespace so the code never starts/ends with "_"
    .toUpperCase()
    .replace(/\s+/g, "_") // spaces become single underscores
    .replace(/[^A-Z0-9_]/g, "") // strip anything that isn't a letter, digit or underscore
    .replace(/_+/g, "_") // collapse repeated underscores
    .replace(/^_+|_+$/g, ""); // no leading/trailing underscore
}
