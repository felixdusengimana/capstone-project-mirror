export function isValidURL(input: string) {
  const pattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  return pattern.test(input);
}

export function extractDomainFromURL(url: string) {
  if (!isValidURL(url)) {
    return null;
  }

  // Remove protocol (http, https), www., and any path after the domain
  const domain = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];

  // Split the domain into parts by dots
  const parts = domain.split(".");

  // If there are at least 3 parts and the last part is a common TLD (like "com", "co", etc.),
  // we assume the second-to-last part is the main domain
  if (parts.length > 2) {
    return String(parts[parts.length - 2]).toLowerCase();
  }

  // For simpler cases like "google.com"
  return parts[0] ? String(parts[0]).toLowerCase() : null;
}

export function ensureHttps(url: string) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

export function removeProtocol(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "");
}

export function getURLPathName(url: string) {
  // Check if the URL is valid
  if (!isValidURL(url)) {
    return url;
  }

  const urlObj = new URL(url);
  const path = urlObj.pathname;
  return path.replace(/^\/|\/$/g, "");
}
