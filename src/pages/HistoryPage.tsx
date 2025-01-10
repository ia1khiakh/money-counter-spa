import { A, useParams } from "@solidjs/router";
import {
  For,
  Show,
  Signal,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import {
  TransactionType,
  removeTransactions,
  transtactionStore,
} from "../stores/transactionStore";
import { locales } from "../globals";
import { DateWidget } from "../components/DateWidget";
import { ArrowSVG } from "../components/svg/ArrowSVG";
import { TimeSVG } from "../components/svg/TimeSVG";
import { AddSVG } from "../components/svg/AddSVG";
import { TrashSVG } from "../components/svg/TrashSVG";
import { dateToDateString } from "../utils";

export const HistoryPage = () => {
  const params = useParams();
  if (!params.ISO_DATE) {
    // validation???
    throw "sth";
  }

  const getCurrentDate = createMemo(() => new Date(params.ISO_DATE));

  const getBeforeCurrentDate = createMemo(() =>
    ((x) => (x.setDate(x.getDate() - 1), x))(new Date(getCurrentDate())),
  );

  const getAfterCurrentDateCurrentDate = createMemo(() =>
    ((x) => (x.setDate(x.getDate() + 1), x))(new Date(getCurrentDate())),
  );

  const getCurrentTransactions = createMemo(() =>
    transtactionStore.filter((el) => {
      return (
        new Date(el.date).toDateString() === getCurrentDate().toDateString()
      );
    }),
  );

  const [
    getCheckboxesForCurrentTransactions,
    setCheckboxesForCurrentTransactions,
  ] = createSignal<Map<TransactionType["id"], Signal<boolean>>>(
    new Map(
      transtactionStore.map((el) => [el.id, createSignal(false)] as const),
    ),
    { equals: false },
  );

  createEffect(() => {
    setCheckboxesForCurrentTransactions((prev) => {
      const newMap = new Map();

      transtactionStore.forEach((el) => {
        if (prev.has(el.id)) {
          newMap.set(el.id, prev.get(el.id));
        } else {
          newMap.set(el.id, { isCheckedSignal: createSignal(false) });
        }
      });

      return newMap;
    });
  });

  createEffect(() => {
    console.log(
      Array.from(getCheckboxesForCurrentTransactions().values()).map((signal) =>
        signal[0](),
      ),
    );
  });

  const formatter = new Intl.DateTimeFormat(locales, {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      <DateWidget
        date={getCurrentDate()}
        left={
          <A href={`/history/${dateToDateString(getBeforeCurrentDate())}`}>
            <ArrowSVG />
          </A>
        }
        right={
          <A
            href={`/history/${dateToDateString(getAfterCurrentDateCurrentDate())}`}
          >
            <div class="-scale-x-100">
              <ArrowSVG />
            </div>
          </A>
        }
      />

      <div class="h-7" />

      <ul>
        <For each={getCurrentTransactions()}>
          {(el, getIndex) => {
            const bgClassForPrice =
              el.action === "income" ? "bg-green-700" : "bg-red-700";

            const [moneyBD, moneyAD] = el.amount.split(".");

            const isCheckedSignal = getCheckboxesForCurrentTransactions().get(
              el.id,
            );

            if (!isCheckedSignal) {
              throw "sth";
            }

            return (
              <li class="border-t border-cyan-800 py-4 has-[:checked]:bg-cyan-800">
                <div class="flex items-center justify-between gap-x-2 px-3 text-xl">
                  <input
                    class=""
                    type="checkbox"
                    checked={isCheckedSignal[0]()}
                    onChange={(ev) => {
                      isCheckedSignal[1](ev.currentTarget.checked);
                    }}
                  />
                  <span class="font-semibold">
                    <span class="text-c-xxs">#</span>
                    {getIndex() + 1}
                  </span>
                  <div class="flex items-baseline gap-x-1">
                    <div class="relative top-0.5">
                      <TimeSVG width={14} height={14} />
                    </div>

                    <span class="text-xl">
                      {formatter.format(new Date(el.date))}
                    </span>
                  </div>

                  <div
                    class={`${bgClassForPrice} rounded-sm font-semibold tracking-wider`}
                  >
                    <div class="px-2 py-1">
                      {moneyBD}
                      <span class="text-c-xxs">
                        .{moneyAD} {el.currency}
                      </span>
                    </div>
                  </div>
                </div>

                {el.comment && (
                  <div class="pr-3">
                    <div class="h-2.5" />

                    <p class="rounded-sm bg-cyan-800 px-3 py-1 text-sm">
                      {el.comment}
                    </p>
                  </div>
                )}
              </li>
            );
          }}
        </For>
      </ul>
      <div class="border-t border-cyan-800" />

      {/* --------------------------------- */}

      <Show
        when={Array.from(getCheckboxesForCurrentTransactions().values()).some(
          (isCheckedSignal) => isCheckedSignal[0](),
        )}
        fallback={
          <A
            href="/add"
            class="fixed bottom-4 right-4 rounded-full bg-green-700 p-4"
          >
            <AddSVG />
          </A>
        }
      >
        <button
          class="fixed bottom-4 right-4 rounded-full bg-red-700 p-4"
          onClick={() => {
            const idsToDelete = Array.from(
              getCheckboxesForCurrentTransactions(),
            )
              .filter(([_, signal]) => signal[0]())
              .map(([id]) => id);

            removeTransactions(idsToDelete);
          }}
        >
          <TrashSVG />
        </button>
      </Show>
    </>
  );
};
