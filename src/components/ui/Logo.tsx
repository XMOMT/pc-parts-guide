import { siteConfig } from "@/lib/data";

type LogoProps = {
  showText?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
      <rect x="9" y="9" width="14" height="14" rx="2" stroke="white" strokeWidth="1.5" />
      <rect x="12" y="12" width="8" height="8" rx="1" fill="white" fillOpacity="0.9" />
      <path
        d="M16 6V9M16 23V26M6 16H9M23 16H26M8.5 8.5L10.6 10.6M21.4 21.4L23.5 23.5M23.5 8.5L21.4 10.6M10.6 21.4L8.5 23.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#33a1ff" />
          <stop offset="1" stopColor="#1368e1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({
  showText = true,
  className = "",
  iconClassName = "h-8 w-8",
  textClassName = "text-lg font-bold tracking-tight text-white",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon className={iconClassName} />
      {showText && <span className={textClassName}>{siteConfig.name}</span>}
    </span>
  );
}
