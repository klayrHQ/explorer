export const ArrowUpRight = ({ className, }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="1em"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7L7 7M17 7V17"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
