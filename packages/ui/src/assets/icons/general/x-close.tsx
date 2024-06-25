export const CrossClose = ({ className, }: { className?: string }) => {
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
          d="M6 6L18 18M6 18L18 6"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
  