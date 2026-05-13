import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "danger";

type ButtonProps = {
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  title: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus-visible:ring-blue-500",
  danger:
    "bg-red-500 text-white shadow-sm hover:bg-red-600 focus-visible:ring-red-500",
};

export default function Button({
  disabled = false,
  onClick,
  title,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} rounded-xl px-5 py-3 text-sm ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
