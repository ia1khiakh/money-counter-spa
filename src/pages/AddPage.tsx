import { A, useNavigate } from "@solidjs/router";

import { onMount } from "solid-js";
import { DateWidget } from "../components/DateWidget";
import { ResetSVG } from "../components/svg/ResetSVG";
import { TimeSVG } from "../components/svg/TimeSVG";
import { addTransaction } from "../stores/transactionStore";
import { dateToDateString } from "../utils";

export const AddPage = () => {
  // ---------------------------------------------
  const navigate = useNavigate();

  // ---------------------------------------------
  const today = new Date();

  // ---------------------------------------------
  // FORM

  // ---------------
  let formElementRef: HTMLFormElement | undefined;

  const resetTheForm = () => {
    if (!formElementRef) {
      throw "REF was not mounted properly";
    }

    formElementRef.reset();
  };

  // ---------------
  const handleFormSubmit = (
    ev: SubmitEvent & { currentTarget: HTMLFormElement },
  ) => {
    ev.preventDefault();

    console.log({ ev });

    const formData = new FormData(ev.currentTarget);

    const amount = formData.get("amount");
    const comment = formData.get("comment");
    const action = (ev.submitter as HTMLButtonElement).value;

    if (
      typeof amount !== "string" ||
      typeof comment !== "string" ||
      (action !== "income" && action !== "outcome")
    ) {
      throw "sth";
    }

    ev.currentTarget.checkValidity;

    // STUPID VALIDATION LOGIC
    {
      const input = ev.currentTarget.elements.namedItem("amount");

      if (!(input instanceof HTMLInputElement)) {
        throw "sth";
      }

      const value = parseFloat(amount);

      if (isNaN(value) || value <= 0) {
        input.setCustomValidity("Сумма дожна быть больше нуля");
        input.reportValidity();
        input.setCustomValidity("");

        return;
      }
    }

    ev.currentTarget.reset();

    addTransaction({
      currency: "TJS",
      amount,
      comment,
      action,
      date: today.toISOString(),
    });

    navigate(`/history/${dateToDateString(today)}`);
  };

  // ---------------------------------------------
  // AMOUNT

  const DEFAULT_AMOUNT = "0.00";

  // ---------------
  const handleInputFocus = (
    ev: FocusEvent & { currentTarget: HTMLInputElement },
  ) => {
    const iod = ev.currentTarget.value.indexOf(".");
    if (iod === -1) {
      return;
    }
    ev.currentTarget.setSelectionRange(0, iod);
  };

  const handleInputChange = (
    ev: Event & { currentTarget: HTMLInputElement },
  ) => {
    if (/^(?!0\d)\d+(\.\d{0,2})?$/.test(ev.currentTarget.value)) {
      ev.currentTarget.value = parseFloat(ev.currentTarget.value).toFixed(2);

      return;
    }

    ev.currentTarget.value = "0.00";
  };

  const handleInputBeforeInput = (
    ev: InputEvent & { currentTarget: HTMLInputElement },
  ) => {
    if (ev.inputType === "insertText" && ev.data) {
      const iod = ev.currentTarget.value.indexOf(".");

      if (iod !== -1 && ev.data === ".") {
        ev.currentTarget.setSelectionRange(
          iod + 1,
          ev.currentTarget.value.length,
        );
        ev.preventDefault();
      }
    }
  };

  // ---------------
  let amountInputElementRef: HTMLInputElement | undefined;

  onMount(() => {
    if (!amountInputElementRef) {
      throw "REF was not mounted properly";
    }

    amountInputElementRef.focus();
  });

  // ---------------------------------------------
  return (
    <>
      <DateWidget
        date={today}
        left={
          <button onClick={resetTheForm}>
            <ResetSVG />
          </button>
        }
        right={
          <A href={`/history/${dateToDateString(today)}`}>
            <TimeSVG />
          </A>
        }
      />

      <div class="h-20" />

      <form
        ref={formElementRef}
        onSubmit={handleFormSubmit}
        class="flex grow flex-col"
      >
        <div class="flex items-baseline gap-x-4">
          <input
            required
            ref={amountInputElementRef}
            name="amount"
            type="text"
            inputMode="numeric"
            class="min-w-0 flex-1 rounded-md bg-cyan-800 p-2.5 text-right text-5xl font-semibold invalid:outline-2 invalid:outline-red-500"
            value={DEFAULT_AMOUNT}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            onBeforeInput={handleInputBeforeInput}
          />

          <span class="text-6xl">TJS</span>
        </div>

        <div class="h-14" />

        <div class="relative flex grow">
          <div class="absolute bottom-full left-0 text-cyan-800">
            <svg width="12" height="19" viewBox="0 0 12 19" fill="currentColor">
              <path d="M0 0 L12 19 L0 19 Z" />
            </svg>
          </div>
          <textarea
            class="w-full grow rounded-md rounded-tl-none bg-cyan-800 px-3 py-4"
            placeholder="Комментарий"
            name="comment"
          />
        </div>

        <div class="h-10" />

        <div class="grid grid-cols-2 gap-x-2 text-2xl *:rounded-md *:px-7 *:py-1.5">
          <button class="bg-red-700 text-white" name="action" value="outcome">
            Расход
          </button>
          <button class="bg-green-700 text-white" name="action" value="income">
            Приход
          </button>
        </div>
      </form>
    </>
  );
};
