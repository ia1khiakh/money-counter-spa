import { ComponentProps } from "solid-js";

export const PlusSVG = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.412 14V0h3.176v14zM0 8.588V5.412h14v3.176z"
    ></path>
  </svg>
);
