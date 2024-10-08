import { CSSProperties } from 'react';

export const ArrowRight = ({ className, style }: { className?: string; style: CSSProperties }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="1em"
      strokeWidth={2}
      style={style}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
