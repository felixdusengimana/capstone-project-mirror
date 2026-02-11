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
