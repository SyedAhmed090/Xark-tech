/* Slide-swap hover: the label rolls up and a klein copy rolls in.
   Put `group/swap` styling to work by hovering the wrapper itself or a
   parent with the `group` class. */
export default function SwapText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block overflow-hidden align-bottom ${className ?? ""}`}
    >
      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute inset-0 block translate-y-full text-klein transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}
