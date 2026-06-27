interface UploadImageIconProps {
  className?: string;
}

export function UploadImageIcon({ className = "" }: UploadImageIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M8 14.5C8 12.0147 10.0147 10 12.5 10H19.2L22.4 13.2H35.5C37.9853 13.2 40 15.2147 40 17.7V35.5C40 37.9853 37.9853 40 35.5 40H12.5C10.0147 40 8 37.9853 8 35.5V14.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 21V31"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 26L24 21L29 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
