import date from "date-and-time";
export const getCurrentDateAndTime = () => {
  const now = new Date();
  return {
    time: date.format(now, "HH:mm"),
    date: date.format(now, "dddd, DD MMM"),
  };
};

export const formatDate = (inputDate: string): string => {
  const dateObj = new Date(inputDate);

  dateObj.setDate(dateObj.getDate());
  return date.format(dateObj, "dddd, DD MMM");
};
