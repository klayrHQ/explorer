import { SVGIconProps } from '../../../types/types.ts';

export const Minus = ({ className, style }: SVGIconProps) => (
  <svg
    className={className}
    style={style}
    width="1em"
    height="1em"
    strokeWidth="2"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 12H19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
