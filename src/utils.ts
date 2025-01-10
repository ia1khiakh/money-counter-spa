export const dateToDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};
