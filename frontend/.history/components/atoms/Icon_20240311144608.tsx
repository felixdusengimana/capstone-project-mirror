import { ComponentProps } from "react";

interface IconProps extends ComponentProps<"svg"> {
  name: "user" | "search" | "google-play" | "apple-store";
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
      {...props}
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

function AppleStore({ ...props }) {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.8872 11.6924C14.9088 10.0114 15.8116 8.42082 17.2437 7.54036C16.3402 6.25004 14.827 5.43194 13.2526 5.38268C11.5733 5.20642 9.94537 6.38751 9.08966 6.38751C8.21739 6.38751 6.89989 5.40018 5.48116 5.42937C3.6319 5.48911 1.90794 6.5405 1.00824 8.15724C-0.925764 11.5057 0.516826 16.4267 2.36944 19.1333C3.29634 20.4587 4.37962 21.9391 5.79707 21.8866C7.18413 21.8291 7.70217 21.0021 9.37647 21.0021C11.0352 21.0021 11.5213 21.8866 12.9675 21.8532C14.4558 21.8291 15.3936 20.522 16.288 19.1841C16.954 18.2397 17.4664 17.196 17.8064 16.0916C16.0573 15.3518 14.8892 13.5916 14.8872 11.6924Z"
        fill="#DBDBDB"
      />
      <path
        d="M12.1555 3.60268C12.967 2.62847 13.3668 1.37629 13.27 0.112061C12.0302 0.242281 10.8849 0.83484 10.0624 1.77167C9.25815 2.687 8.83959 3.91715 8.91872 5.13306C10.159 5.14583 11.3783 4.56933 12.1555 3.60268Z"
        fill="#DBDBDB"
      />
    </svg>
  );
}

function Secure({ ...props }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6.17063L16.006 2.66663L28 6.17063V13.356C27.9999 17.0384 26.8411 20.6275 24.6877 23.6147C22.5344 26.602 19.4956 28.8359 16.002 30C12.5073 28.836 9.46753 26.6018 7.3134 23.6139C5.15927 20.6261 4.00005 17.0361 4 13.3526V6.17063Z"
        stroke="white"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      <path
        d="M10 15.3333L14.6667 20L22.6667 12"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
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
    case "google-play":
      return <GooglePlay {...props} />;
    case "apple-store":
      return <AppleStore {...props} />;
    default:
      return null;
  }
}
