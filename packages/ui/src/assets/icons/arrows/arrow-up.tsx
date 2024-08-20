import { CSSProperties } from 'react';

export const ArrowUp = ({ className, style }: { className?: string; style: CSSProperties }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="1em"
      strokeWidth="1.5"
      style={style}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99992 12.667V3.333M7.99992 3.333L3.33325 8.00065M7.99992 3.333L12.6666 8.00065"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
