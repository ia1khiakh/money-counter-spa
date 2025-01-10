import { batch } from "solid-js";
import { createStore, produce, unwrap } from "solid-js/store";

export type TransactionType = {
  id: string;
  date: string;
  amount: string;
  currency: string;
  action: "income" | "outcome";
  comment: string;
  // tags: string[];
};

type TranstactionStoreType = TransactionType[];

const randomUUID = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) =>
    ((Math.random() * 16) | (c === "x" ? 0 : 0x3 | 0x8)).toString(16),
  );

export const [transtactionStore, setTranstactionStore] =
  createStore<TranstactionStoreType>(
    ((x) => (x ? JSON.parse(x) : []))(localStorage.getItem("transactionStore")),
  );

const saveTransactionStoreToLocalStorage = () => {
  localStorage.setItem(
    "transactionStore",
    JSON.stringify(unwrap(transtactionStore)),
  );
};

export const addTransaction = (arg: Omit<TransactionType, "id">) => {
  const id = randomUUID();

  setTranstactionStore(
    produce((prev) => {
      prev.push({ ...arg, id });
    }),
  );

  saveTransactionStoreToLocalStorage();
};

export const removeTransactions = (arg: TransactionType["id"][]) => {
  batch(() => {
    arg.forEach((id) => {
      const transactionIndex = transtactionStore.findIndex(
        (el) => el.id === id,
      );

      if (transactionIndex === -1) {
        throw {
          message: "Could not remove transaction",
          reason: "Transaction with this id does not exists",
        };
      }

      setTranstactionStore(
        produce((prev) => {
          prev.splice(transactionIndex, 1);
        }),
      );
    });
  });

  saveTransactionStoreToLocalStorage();
};
