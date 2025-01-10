import { ComponentProps } from "solid-js";

export const TimeSVG = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 10v5h3m6 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    ></path>
  </svg>
);
