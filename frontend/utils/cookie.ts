export function setCookie(
  name: string,
  value: string,
  expiresIn: number | null
): void {
  let expires: string = "";
  if (expiresIn) {
    const date: Date = new Date();
    date.setTime(date.getTime() + expiresIn * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + encodeURIComponent(value || "") + expires + "; path=/";
}

export function removeCookie(name: string): void {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function getCookie(cookieName: string) {
  // Extract all cookies
  const cookies = document.cookie.split("; ");

  // Find the cookie with the given name
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));

  // If the cookie is found, return its value
  if (cookie) {
    return cookie.split("=")[1];
  } else {
    return null; // Return null if the cookie is not found
  }
}
