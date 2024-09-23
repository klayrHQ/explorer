export const WarningIcon = ({ className }: { className?: string }) => {
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
          d="M19 32C11.8203 32 6 26.1797 6 19C6 11.8203 11.8203 6 19 6C26.1797 6 32 11.8203 32 19C32 26.1797 26.1797 32 19 32Z"
          stroke="#F59E0B"
          strokeWidth="2"
        />
      </g>
      <g opacity="0.1">
        <path
          d="M19 37C9.05888 37 1 28.9411 1 19C1 9.05888 9.05888 1 19 1C28.9411 1 37 9.05888 37 19C37 28.9411 28.9411 37 19 37Z"
          stroke="#F59E0B"
          strokeWidth="2"
        />
      </g>
      <g clip-path="url(#clip0_1_45)">
        <path
          d="M19 26.5C23.1421 26.5 26.5 23.1421 26.5 19C26.5 14.8579 23.1421 11.5 19 11.5C14.8579 11.5 11.5 14.8579 11.5 19C11.5 23.1421 14.8579 26.5 19 26.5Z"
          stroke="#F59E0B"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 16V19"
          stroke="#F59E0B"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 22H19.0083"
          stroke="#F59E0B"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_45">
          <rect fill="white" height="18" transform="translate(10 10)" width="18" />
        </clipPath>
      </defs>
    </svg>
  );
};
