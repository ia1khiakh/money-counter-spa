import { ComponentProps } from "solid-js";

export const TrashSVG = (props: ComponentProps<"svg">) => (
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
      stroke-width="2.5"
      d="M5 7.5h20m-5 0-.338-1.015c-.328-.983-.492-1.475-.796-1.839a2.5 2.5 0 0 0-1.003-.723c-.441-.173-.96-.173-1.996-.173h-1.734c-1.037 0-1.555 0-1.996.173a2.5 2.5 0 0 0-1.003.723c-.304.364-.468.856-.796 1.84L10 7.5m12.5 0v12.75c0 2.1 0 3.15-.409 3.953a3.75 3.75 0 0 1-1.639 1.638c-.802.409-1.852.409-3.952.409h-3c-2.1 0-3.15 0-3.952-.409a3.75 3.75 0 0 1-1.64-1.639C7.5 23.4 7.5 22.35 7.5 20.25V7.5m10 5v8.75m-5-8.75v8.75"
    ></path>
  </svg>
);
