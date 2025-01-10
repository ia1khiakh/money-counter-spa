import { ComponentProps } from "solid-js";

export const AddSVG = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      fill="#fff"
      d="M17.125 6.188a2.188 2.188 0 0 0-4.375 0v6.562H6.188a2.188 2.188 0 0 0 0 4.375h6.562v6.563a2.188 2.188 0 0 0 4.375 0v-6.563h6.563a2.188 2.188 0 0 0 0-4.375h-6.563z"
    ></path>
  </svg>
);
