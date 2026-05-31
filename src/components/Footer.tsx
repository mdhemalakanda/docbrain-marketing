export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-bold text-black">
              D
            </span>
            <div>
              <p className="font-semibold">DocBrain</p>
              <p className="text-xs text-white/40">
                AI sales agent for modern businesses
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <a href="#how-it-works" className="transition hover:text-emerald-400">
              Process
            </a>
            <a href="#sales-flow" className="transition hover:text-emerald-400">
              Sales Flow
            </a>
            <a href="#integrations" className="transition hover:text-emerald-400">
              Integrations
            </a>
            <a href="#features" className="transition hover:text-emerald-400">
              Features
            </a>
            <a href="#faq" className="transition hover:text-emerald-400">
              FAQ
            </a>
            <a href="#early-access" className="transition hover:text-emerald-400">
              Early Access
            </a>
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} DocBrain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
