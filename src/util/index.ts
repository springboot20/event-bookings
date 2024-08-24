export const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export enum AcceptedPersmissonRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
