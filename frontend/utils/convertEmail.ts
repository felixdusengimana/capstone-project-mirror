export function convertEmail(email: string): string {
  if (!email) return email;
  const [first, ...rest] = email.split("@");
  const lastCharOfFirst = first[first.length - 1];
  const convertedEmail = `${first[0]}${"*".repeat(
    first.length - 2
  )}${lastCharOfFirst}@${rest.join("")}`;
  return convertedEmail;
}
