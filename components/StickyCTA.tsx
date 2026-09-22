import Link from "next/link";
import { ENTRY_PRICE } from "@/lib/services";

/**
 * Persistent action bar on small screens only.
 *
 * No JavaScript and no scroll listener: showing it conditionally would mean a
 * client component and a scroll handler on every page, to hide a bar that is
 * useful the whole way down. `pb-[env(safe-area-inset-bottom)]` keeps it clear
 * of the iOS home indicator.
 *
 * The matching `pb-20 md:pb-0` spacer on the page body stops it covering the
 * last few lines of the footer.
 */
export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--color-line)] bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm leading-tight">
          <span className="font-bold">From {ENTRY_PRICE}</span>
          <br />
          <span className="text-xs text-muted">Fixed price, no calls</span>
        </p>
        <Link href="/packages" className="btn btn-primary shrink-0 px-5 py-3">
          See prices
        </Link>
      </div>
    </div>
  );
}
