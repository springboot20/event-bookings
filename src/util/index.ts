import { format } from "date-fns";

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

export const formatDate = (date: string) => {
  const _date = new Date(date);
  const formattedDate = format(_date, "dd-MMM-yyyy");

  return formattedDate;
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
