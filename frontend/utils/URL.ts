export function isValidURL(input: string) {
  const pattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  return pattern.test(input);
}

export function extractDomainFromURL(url: string) {
  if (!isValidURL(url)) {
    return null;
  }

  const pattern = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
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
