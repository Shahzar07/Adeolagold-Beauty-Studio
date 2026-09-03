"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useScrolledPast } from "@/lib/hooks";
import { primaryNav } from "@/lib/navigation";
import { cx } from "@/lib/format";
import { useCart } from "@/context/CartProvider";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchDrawer } from "./SearchDrawer";
import { MegaMenu } from "./MegaMenu";
import { AccountIcon, BagIcon, MenuIcon, SearchIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const { count, open: openCart, addPulse, hydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);

  // The header compacts once the hero starts scrolling away.
  const scrolled = useScrolledPast(24);

  // Close any open panel on navigation. Adjusting state during render is the
  // recommended pattern for resetting state when a prop changes — it avoids an
  // extra commit with the stale panel still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenNav(null);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  // Animate the bag count whenever a line is added.
  const [lastPulse, setLastPulse] = useState(addPulse);
  if (addPulse !== lastPulse) {
    setLastPulse(addPulse);
    if (addPulse > 0) setPulse(true);
  }

  useEffect(() => {
    if (!pulse) return;
    const id = window.setTimeout(() => setPulse(false), 500);
    return () => window.clearTimeout(id);
  }, [pulse]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-[12px] focus:uppercase focus:tracking-[0.12em] focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cx(
          "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-[350ms] ease-lux",
          scrolled
            ? "border-line bg-background/92 backdrop-blur-md"
            : "border-transparent bg-background",
        )}
        onMouseLeave={() => setOpenNav(null)}
      >
        <div
          className={cx(
            "container-wide flex items-center justify-between gap-6 transition-[height] duration-[350ms] ease-lux",
            scrolled ? "h-[62px] lg:h-[70px]" : "h-[68px] lg:h-[88px]",
          )}
        >
          {/* Mobile: menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="-ml-2.5 flex h-11 w-11 items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          {/* Left: logo (centred on mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0">
            <Logo compact={scrolled} />
          </div>

          {/* Centre: primary navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => setOpenNav(item.columns ? item.label : null)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={item.columns ? openNav === item.label : undefined}
                      className={cx(
                        "relative block py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-[180ms]",
                        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-[350ms] after:ease-lux",
                        "hover:after:origin-left hover:after:scale-x-100",
                        active || openNav === item.label
                          ? "text-ink after:origin-left after:scale-x-100"
                          : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-0.5 lg:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold max-lg:hidden"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold max-lg:hidden"
            >
              <AccountIcon className="h-[18px] w-[18px]" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Bag, ${hydrated ? count : 0} item${count === 1 ? "" : "s"}`}
              className="relative -mr-2.5 flex h-11 w-11 items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold lg:mr-0"
            >
              <BagIcon className="h-[18px] w-[18px]" />
              {hydrated && count > 0 ? (
                <span
                  className={cx(
                    "absolute right-1 top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gold px-1 text-[9.5px] font-medium tabular-nums text-white",
                    pulse && "animate-bag-pulse",
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>

            <ButtonLink
              href="/book"
              size="sm"
              className="ml-3 hidden h-10 px-5 text-[10px] xl:inline-flex"
            >
              Book Appointment
            </ButtonLink>
          </div>
        </div>

        {/* Mega menu */}
        {primaryNav.map((item) =>
          item.columns ? (
            <MegaMenu
              key={item.label}
              item={item}
              open={openNav === item.label}
              onClose={() => setOpenNav(null)}
            />
          ) : null,
        )}
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
      />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
