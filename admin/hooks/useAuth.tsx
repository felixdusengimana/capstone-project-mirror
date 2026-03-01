import { cookies } from "next/headers";

export function useAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const isLoggedIn = !!token;
  return { token, isLoggedIn };
}
