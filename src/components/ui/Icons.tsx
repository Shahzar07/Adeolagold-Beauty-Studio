/* Hand-drawn line icons at a consistent 1.15px stroke on a 24px grid.
   Deliberately not an icon library — the weight is tuned to the type. */

type IconProps = React.SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.25" />
    <path d="M15.6 15.6L20 20" />
  </Icon>
);

export const AccountIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8.4" r="3.6" />
    <path d="M4.8 20c0-3.6 3.2-5.9 7.2-5.9s7.2 2.3 7.2 5.9" />
  </Icon>
);

export const BagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.4 7.6h13.2L19.8 20H4.2L5.4 7.6z" />
    <path d="M8.9 10V6.9a3.1 3.1 0 016.2 0V10" />
  </Icon>
);

export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Icon {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.2l-7-6.6A4.3 4.3 0 0112 7.7a4.3 4.3 0 017 5.9l-7 6.6z" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 7.5h17M3.5 12h17M3.5 16.5h11" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15.5M13.5 6l6 6-6 6" />
  </Icon>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12H4.5M10.5 6l-6 6 6 6" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 9l6.5 6.5L18.5 9" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Icon>
);

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 12h13" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 12.5l4.8 4.8L19.5 7" />
  </Icon>
);

export const FilterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 7h17M6.5 12h11M10 17h4" />
  </Icon>
);

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.8" y="5.4" width="16.4" height="14.4" rx="1" />
    <path d="M3.8 9.8h16.4M8.4 3.5v3.4M15.6 3.5v3.4" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.3V12l3.2 2" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="10.4" width="14" height="9.4" rx="1.2" />
    <path d="M8.3 10.4V7.9a3.7 3.7 0 017.4 0v2.5" />
  </Icon>
);

export const TruckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.8 6.6h11v9.2h-11z" />
    <path d="M13.8 10.2h3.6l3.2 3v2.6h-6.8z" />
    <circle cx="7" cy="17.8" r="1.7" />
    <circle cx="17" cy="17.8" r="1.7" />
  </Icon>
);

export const SparkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.4l1.9 5.6 5.7 1.9-5.7 2-1.9 5.6-1.9-5.6-5.7-2 5.7-1.9L12 3.4z" />
  </Icon>
);

export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4.4" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="M16.9 7.1h.01" />
  </Icon>
);

export const TikTokIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.4 3.6v9.9a3.4 3.4 0 11-3.4-3.4" />
    <path d="M14.4 6.2a4.4 4.4 0 004.4 3.3" />
  </Icon>
);

export const FacebookIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15.4 8.2h-1.6c-.8 0-1.3.5-1.3 1.3v1.6h2.8l-.4 2.8h-2.4V21" />
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
  </Icon>
);

export const YouTubeIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.8" y="5.6" width="18.4" height="12.8" rx="3.6" />
    <path d="M10.4 9.4l4.6 2.6-4.6 2.6z" />
  </Icon>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12a8 8 0 01-11.9 7L4 20l1.1-4A8 8 0 1120 12z" />
    <path d="M9.2 9.3c.3 2.6 2.9 5.2 5.5 5.5l1-1.2 1.7.8-.4 1.4c-2.9.7-7.4-3.8-6.7-6.7l1.4-.4.8 1.7-1.3.9z" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s6.4-5.6 6.4-10.2A6.4 6.4 0 105.6 10.8C5.6 15.4 12 21 12 21z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </Icon>
);

export const StarIcon = ({ fillRatio = 1, ...p }: IconProps & { fillRatio?: number }) => {
  const id = `star-${Math.round(fillRatio * 100)}`;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...p}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fillRatio * 100}%`} stopColor="currentColor" />
          <stop offset={`${fillRatio * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 3.6l2.5 5.6 6 .6-4.5 4.1 1.3 6-5.3-3.1-5.3 3.1 1.3-6L3.5 9.8l6-.6L12 3.6z"
        fill={`url(#${id})`}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
};
