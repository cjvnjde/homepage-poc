import { PropsWithChildren } from "react";
import { css } from "../../../styled-system/css";

export const GridWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={css({
        display: "grid",
        gridGap: "8px",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        maxWidth: "1200px",
        margin: "auto"
      })}
    >
      {children}
    </div>
  );
};
