import { isValid, parseISO, format } from "date-fns";

export const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export enum AcceptedPersmissonRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
};

export const formatDateTime = (date: string) => {
  try {
    const _date = parseISO(date);

    if (!isValid(_date)) {
      console.error("Invalid date:", date);
      return "Invalid Date";
    }

    return format(_date, "hh:mm a");
  } catch (error) {
    console.error("Error parsing date:", date, error);
    return "Invalid Date";
  }
};

export const formatDate = (date: string) => {
  try {
    const _date = parseISO(date);

    if (!isValid(_date)) {
      console.error("Invalid date:", date);
      return "Invalid Date";
    }

    return format(_date, "dd-MMM-yyyy");
  } catch (error) {
    console.error("Error parsing date:", date, error);
    return "Invalid Date";
  }
};

export const isBrowser = typeof window !== "undefined";

export class LocalStorage {
  static get(key: string) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static set(key: string, value: any) {
    if (!isBrowser) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
