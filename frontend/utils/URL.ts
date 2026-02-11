export function isValidURL(input: string) {
  // Regular expression pattern to match URL
  var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  // Test the input against the pattern
  return urlPattern.test(input);
}

export function extractDomainFromURL(url: string) {
  if (!isValidURL(url)) {
    return null;
  }
  const hostname = new URL(url).hostname;

  // get last two segments of hostname
  const hostnameSegments = hostname.split(".");
  return hostnameSegments.slice(-2).join(".");
}
