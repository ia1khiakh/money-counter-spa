import { onMount } from "solid-js";
import { redirect, action, useAction } from "@solidjs/router";

const redirectAction = action(async () => {
  throw redirect("/add");
});

export const NotFoundPage = () => {
  const redirect = useAction(redirectAction);
  onMount(() => {
    redirect();
  });

  return <div>Redirecting...</div>;
};
