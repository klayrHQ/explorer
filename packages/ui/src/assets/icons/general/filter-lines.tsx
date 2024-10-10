import { CSSProperties } from 'react';

export const FilterLines = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="1em"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.66667"
    />
  </svg>
);
