import {CSSProperties} from "react";

export const ArrowUpRight = ({ className, style, }: { className?: string, style?: CSSProperties }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="1em"
      strokeWidth="2"
      style={style}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7L7 7M17 7V17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
