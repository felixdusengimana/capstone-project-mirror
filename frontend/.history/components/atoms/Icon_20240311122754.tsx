import { ComponentProps } from "react";

interface IconProps extends ComponentProps<"svg"> {
  name: "user" | "search";
}

function User({ ...props }) {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
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

function Search({ ...props }) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
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
    </svg>
  );
}

function GooglePlay({ ...props }) {
  return (
    <svg
      width="24"
      height="26"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 1.8021C0.5 1.51614 0.542639 1.28558 0.609847 1.10408L12.3649 12.8601L0.609492 24.6155C0.542481 24.4343 0.5 24.2041 0.5 23.9181V1.8021Z"
        fill="#DBDBDB"
        stroke="#141416"
      />
      <path
        d="M21.7947 13.8705L17.1402 16.5151L13.4871 12.8602L17.1401 9.20711L21.795 11.8518C22.4025 12.1971 22.5898 12.5815 22.5898 12.8607C22.5898 13.14 22.4024 13.5247 21.7947 13.8705Z"
        fill="#DBDBDB"
        stroke="#141416"
      />
      <path
        d="M12.9249 13.5672L1.28237 25.2107C1.53963 25.2489 1.87564 25.1875 2.29386 24.9504L12.9249 13.5672ZM12.9249 13.5672L16.3313 16.9736L2.29424 24.9502L12.9249 13.5672Z"
        fill="#DBDBDB"
        stroke="#141416"
      />
      <path
        d="M2.29386 0.770789L2.29389 0.770804L16.3314 8.74667L12.9258 12.1539L1.28212 0.510202C1.53951 0.471751 1.87563 0.533127 2.29386 0.770789Z"
        fill="#DBDBDB"
        stroke="#141416"
      />
    </svg>
  );
}

export default function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case "user":
      return <User {...props} />;
    case "search":
      return <Search {...props} />;
    default:
      return null;
  }
}
