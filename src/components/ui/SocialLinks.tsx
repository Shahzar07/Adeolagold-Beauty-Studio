import { design } from "@/lib/design";
import { cx } from "@/lib/format";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/ui/Icons";

const { social, name, phoneE164 } = design.brand;

/** The studio's real accounts, in the order they are shown across the site. */
export const socialAccounts = [
  { key: "instagram", label: "Instagram", href: social.instagram.url, Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", href: social.tiktok.url, Icon: TikTokIcon },
  { key: "facebook", label: "Facebook", href: social.facebook.url, Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", href: social.youtube.url, Icon: YouTubeIcon },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${phoneE164.replace(/[^0-9]/g, "")}`,
    Icon: WhatsAppIcon,
  },
] as const;

export function SocialLinks({
  className,
  linkClassName,
  iconClassName = "h-[18px] w-[18px]",
}: {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cx("flex items-center gap-1", className)}>
      {socialAccounts.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on ${label}`}
          className={cx(
            "flex h-11 w-11 items-center justify-center transition-colors duration-[180ms]",
            linkClassName,
          )}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
