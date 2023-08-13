import { type InputHTMLAttributes, type ReactElement } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactElement | string;
}

export default function Input({ label, name, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        name={name}
        id={name}
        {...props}
        className={`h-10 w-full rounded-lg bg-level2 px-3 py-2 placeholder:text-quaternaryText ${
          props.className ?? ""
        }`}
      />
    </div>
  );
}
