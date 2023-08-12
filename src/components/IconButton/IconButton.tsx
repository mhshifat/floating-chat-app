import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  shouldFill?: boolean;
}

export default function IconButton({
  children,
  shouldFill,
  className,
  ...restProps
}: PropsWithChildren<IconButtonProps>) {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center [&_svg]:h-6 [&_svg]:w-6 ${
        shouldFill ? "[&>svg>*]:fill-primaryText" : ""
      } ${className ? className : ""}`}
      {...restProps}
    >
      {children}
    </button>
  );
}
