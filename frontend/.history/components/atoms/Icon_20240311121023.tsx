function User() {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 17.5C23.2614 17.5 25.5 15.2614 25.5 12.5C25.5 9.73858 23.2614 7.5 20.5 7.5C17.7386 7.5 15.5 9.73858 15.5 12.5C15.5 15.2614 17.7386 17.5 20.5 17.5Z"
        stroke="#4B5563"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M33 34.1666C32.2083 18.6116 8.79167 18.6116 8 34.1666"
        stroke="#4B5563"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function Search() {
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.25 21C17.4967 21 21.75 16.7467 21.75 11.5C21.75 6.25329 17.4967 2 12.25 2C7.00329 2 2.75 6.25329 2.75 11.5C2.75 16.7467 7.00329 21 12.25 21Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.75 22L20.75 20"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>;
}
export default function Icon({ name }: { name: "user" }) {
  if (name === "user") {
    return <User />;
  }
  return null;
}
