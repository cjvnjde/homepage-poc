import { PropsWithChildren } from "react";
import { css } from "../../../styled-system/css";

export const RootWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={css({
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "bg",
        padding: "16px",
      })}
    >
      {children}
    </div>
  );
};
