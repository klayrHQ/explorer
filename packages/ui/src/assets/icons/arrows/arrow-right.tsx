export const ArrowRight = ({ className, }: { className?: string }) => {
    return (
      <svg
        className={className}
        fill="none"
        height="1em"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 12L5 12M5 12L12 19M5 12L12 5" 
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };