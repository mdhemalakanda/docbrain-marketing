type MockupCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  tip?: string;
  className?: string;
};

export function MockupCard({
  title,
  subtitle,
  children,
  tip,
  className = "",
}: MockupCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-2xl transition-all duration-500 hover:border-emerald-500/20 hover:shadow-[0_32px_64px_-24px_rgba(16,185,129,0.35)] ${className}`}
    >
      <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <h4 className="text-base font-semibold sm:text-lg">{title}</h4>
        <p className="mt-1 text-xs text-white/45 sm:text-sm">{subtitle}</p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
      {tip ? (
        <div className="mx-5 mb-5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:mx-6 sm:mb-6">
          <p className="text-xs leading-relaxed text-white/55">
            <span className="mr-1.5">💡</span>
            <span className="font-medium text-white/70">Pro tip:</span> {tip}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function StackedMockup({
  children,
  depth = 2,
}: {
  children: React.ReactNode;
  depth?: number;
}) {
  return (
    <div className="stack-hover relative mx-auto max-w-lg">
      {Array.from({ length: depth }).map((_, index) => (
        <div
          key={index}
          className="stack-layer absolute inset-x-4 rounded-2xl border border-white/[0.04] bg-[#111]"
          style={{
            top: `${(depth - index) * 10}px`,
            height: "100%",
            opacity: 0.35 - index * 0.1,
            transform: `scale(${0.96 - index * 0.02})`,
            zIndex: index,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">
      {children}
    </label>
  );
}

export function MockInput({
  value,
  multiline = false,
}: {
  value: string;
  multiline?: boolean;
}) {
  const className =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-xs text-white/70 sm:text-sm";

  if (multiline) {
    return <div className={`${className} min-h-[72px] leading-relaxed`}>{value}</div>;
  }

  return <div className={className}>{value}</div>;
}
