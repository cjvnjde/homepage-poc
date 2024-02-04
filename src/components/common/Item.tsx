import { clsx } from "clsx";
import { forwardRef, HTMLProps, PropsWithChildren } from "react";
import { css } from "../../../styled-system/css";

export const Item = forwardRef<HTMLDivElement, PropsWithChildren<HTMLProps<HTMLDivElement>>>(({ children, className, ...props}, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(css({
        width: "100%",
        maxWidth: "220px",
        padding: "20px 16px 4px",
        borderRadius: "8px",
        background: "bgSecondary",
        border: "1px solid rgba(0, 0, 0, 0.1)",
      }), className)}
    >
      {children}
    </div>
  );
});
