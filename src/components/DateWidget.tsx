import { JSXElement, createMemo } from "solid-js";
import { locales } from "../globals";

export const DateWidget = (props: {
  date: Date;
  left: JSXElement;
  right: JSXElement;
}) => {
  const getTop = createMemo(() =>
    new Intl.DateTimeFormat(locales, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
      .format(props.date)
      .replaceAll(".", "")
      .replaceAll("г", "")
      .trim(),
  );

  const getBottom = createMemo(() =>
    new Intl.DateTimeFormat(locales, {
      weekday: "long",
    })
      .format(props.date)
      .trim(),
  );

  return (
    <div class="flex items-center">
      {props.left}
      <div class="grow text-center capitalize">
        <div class="text-sm">{getTop()}</div>
        <div class="text-2xl font-medium">{getBottom()}</div>
      </div>
      {props.right}
    </div>
  );
};
