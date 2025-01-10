import { ParentProps } from "solid-js";

export default function PageWrapper(props: ParentProps) {
  return (
    <div class="sm:hidden">
      <div class="container flex min-h-svh flex-col bg-cyan-950 px-4 py-6 text-white">
        {props.children}
      </div>
    </div>
  );
}
