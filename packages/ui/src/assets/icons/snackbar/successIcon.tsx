export const SuccessIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="38"
      viewBox="0 0 38 38"
      width="38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <path
          d="M6 19C6 11.8203 11.8203 6 19 6C26.1797 6 32 11.8203 32 19C32 26.1797 26.1797 32 19 32C11.8203 32 6 26.1797 6 19Z"
          stroke="#22C55E"
          strokeWidth="2"
        />
      </g>
      <g opacity="0.1">
        <path
          d="M1 19C1 9.05888 9.05888 1 19 1C28.9411 1 37 9.05888 37 19C37 28.9411 28.9411 37 19 37C9.05888 37 1 28.9411 1 19Z"
          stroke="#22C55E"
          strokeWidth="2"
        />
      </g>
      <g clip-path="url(#clip0_733_24591)">
        <path
          d="M15.2503 19.0001L17.7503 21.5001L22.7503 16.5001M27.3337 19.0001C27.3337 23.6025 23.6027 27.3334 19.0003 27.3334C14.398 27.3334 10.667 23.6025 10.667 19.0001C10.667 14.3977 14.398 10.6667 19.0003 10.6667C23.6027 10.6667 27.3337 14.3977 27.3337 19.0001Z"
          stroke="#22C55E"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_733_24591">
          <rect fill="white" height="20" transform="translate(9 9)" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
};
