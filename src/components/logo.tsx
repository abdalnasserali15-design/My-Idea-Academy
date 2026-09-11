interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="My Idea logo"
    >
      <defs>
        <clipPath id="logo-upper-left-half">
          <polygon points="0,0 100,0 0,100" />
        </clipPath>
      </defs>

      <circle cx="50" cy="50" r="48" fill="#111111" />
      <g clipPath="url(#logo-upper-left-half)">
        <circle cx="50" cy="50" r="48" fill="#ffffff" />
      </g>
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="#111111"
        strokeWidth="1.5"
      />

      <text
        x="31"
        y="58"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="40"
        fill="#111111"
      >
        A
      </text>
      <text
        x="69"
        y="46"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#ffffff"
      >
        MY
      </text>
      <text
        x="69"
        y="61"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#ffffff"
      >
        IDEA
      </text>
    </svg>
  );
}
