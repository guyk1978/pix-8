"use client";

interface HelperErrorAlertProps {
  message: string;
  className?: string;
}

export function HelperErrorAlert({ message, className = "" }: HelperErrorAlertProps) {
  return (
    <div
      role="alert"
      className={`tool-workspace-alert rounded-lg px-4 py-3 font-mono text-xs leading-relaxed text-red-400 ${className}`}
    >
      {message}
    </div>
  );
}
