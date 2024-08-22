import React from "react";

export const CustomErrorMessage: React.FC<
  { children: React.ReactNode } & React.ComponentProps<"small">
> = (props) => {
  return <small {...props}>{props.children}</small>;
};
