"use client";

import React, { useEffect, useMemo, useState } from "react";

/* ---------- Icons (user-provided) ---------- */
function DiscordIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 199"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M216.9 16.5A208.1 208.1 0 0 0 164 0a145.5 145.5 0 0 0-6.8 14.1 193.6 193.6 0 0 0-58.4 0A145.5 145.5 0 0 0 92 0a207.8 207.8 0 0 0-52.9 16.5C5.4 67.3-3.3 116.9 1.1 165.8a211.2 211.2 0 0 0 64.1 32.7 161.4 161.4 0 0 0 13.7-22.3 135.5 135.5 0 0 1-21.7-10.4c1.8-1.3 3.5-2.7 5.2-4.1a148.8 148.8 0 0 0 131.2 0c1.7 1.4 3.4 2.8 5.2 4.1a135.1 135.1 0 0 1-21.7 10.4 161.4 161.4 0 0 0 13.7 22.3 211.2 211.2 0 0 0 64.1-32.7c5.2-56.9-8.9-106.1-38-149.3ZM85.5 135.1c-12.4 0-22.6-11.3-22.6-25.2s10-25.2 22.6-25.2c12.7 0 22.8 11.3 22.6 25.2 0 13.9-10 25.2-22.6 25.2Zm85 0c-12.4 0-22.6-11.3-22.6-25.2s10-25.2 22.6-25.2c12.7 0 22.8 11.3 22.6 25.2 0 13.9-9.9 25.2-22.6 25.2Z" />
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.6l-5.2-6.7L5.7 22H2.6l7.3-8.4L1.2 2h6.7l4.7 6.1L18.9 2Zm-1.2 18h1.7L7 3.9H5.2l12.5 16.1Z" />
    </svg>
  );
}

/* ---------- Emoji mapping for roles ---------- */
function RoleEmoji({ tag, className = "" }) {
  const t = String(tag || "").toLowerCase();

  const map = {
    mage: { emoji: "🧙", color: "text-indigo-700", bg: "bg-indigo-50" }, // Image 1
    ritualist: { emoji: "🔥", color: "text-emerald-700", bg: "bg-emerald-50" }, // Image 2
    ritty: { emoji: "🕯️", color: "text-amber-700", bg: "bg-amber-50" }, // Image 3
    "ritty bitty": { emoji: "", color: "text-amber-700", bg: "bg-amber-50" },
    "radiant ritualist": { emoji: "✨", color: "text-amber-700", bg: "bg-amber-50" }, // Image 4
  };

  const entry = map[t] || null;

  if (!entry) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-700 ${className}`}
        aria-hidden
      >
        •
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-hidden
      title={tag}
    >
      <span
        className={`inline-grid place-items-center h-5 w-5 text-sm rounded-full ${entry.bg} ${entry.color} md:h-6 md:w-6`}
        style={{ lineHeight: 1 }}
      >
        {entry.emoji}
      </span>
    </span>
  );
}

/* ---------- Page Component (responsive improvements) ---------- */

export default function Page() {
  const roles = useMemo(
    () => [
      { name: "Radiant Ritualist", count: 3, tier: "Legendary", desc: "Golden Ritualist super rare, only for real leaders.", tag: "Radiant Ritualist" },
      { name: "Ritualist", count: 81, tier: "Epic", desc: "Becoming a Ritualist is the highest honor in our community.", tag: "Ritualist" },
      { name: "Mage", count: 67, tier: "Rare", desc: "Ritualist with a mage specialization.", tag: "Mage" },
      { name: "Zealot", count: 23, tier: "Epic", desc: "High-conviction community member consistently shows up.", tag: "Zealot" },
      { name: "Ritty", count: 432, tier: "Rare", desc: "Long-term, loyal community member.", tag: "ritty" },
      { name: "Ritty-Bitty", count: 727, tier: "Started", desc: "You’re a little bitty baby Ritualist.", tag: "ritty bitty" },
      { name: "NPC", count: 3134, tier: "Bad", desc: "This is just a shameful public badge.", tag: "NPC" },
      { name: "Ascendant", count: 3546, tier: "Common", desc: "You have pledged to Ritual.", tag: "Ascendant" },
      { name: "Harmonic", count: 2550, tier: "Common", desc: "Not special at all.", tag: "Harmonic" },
      { name: "Blessed", count: 7731, tier: "Common", desc: "Forever blessed.", tag: "Blessed" },
      { name: "Cursed", count: 1831, tier: "Common", desc: "Always cursed.", tag: "Cursed" },
      { name: "Community", count: 59958, tier: "All", desc: "Everyone who’s part of the Ritual universe.", tag: "Community" },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [activeTier, setActiveTier] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load Inter font
  useEffect(() => {
    const id = "ritual-font-inter";
    if (document.getElementById(id)) return;
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";
    document.head.appendChild(pre1);
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "anonymous";
    document.head.appendChild(pre2);
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  const tiers = useMemo(() => Array.from(new Set(["All", ...roles.map((r) => r.tier)])), [roles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = roles.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.tag || "").toLowerCase().includes(q) ||
        (r.desc || "").toLowerCase().includes(q)
    );
    if (activeTier !== "All") list = list.filter((r) => r.tier === activeTier);
    return list;
  }, [roles, query, activeTier]);

  const totalHolders = useMemo(() => roles.reduce((s, r) => s + (r.count || 0), 0), [roles]);

  // Helper: close mobile menu on window resize to larger screens
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="min-h-screen text-slate-900 antialiased overflow-x-hidden"
      style={{
        fontFamily: 'Inter, "Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
      }}
    >
      {/* Light background (kept subtle on small screens) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#fffaf3 0%, #fbf6f0 50%, #f6f3ee 100%)" }} />

        {/* geometric accents - hide on small screens to save perf */}
        <div className="hidden md:block absolute -top-40 left-0 h-[480px] w-[480px] rounded-[36%] blur-2xl opacity-70" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,183,77,0.12), transparent 35%)", transform: "rotate(-12deg)" }} />
        <div className="hidden md:block absolute top-12 right-[-100px] h-[420px] w-[420px] rounded-[40%] blur-2xl opacity-65" style={{ background: "radial-gradient(circle at 70% 30%, rgba(124,77,255,0.10), transparent 36%)" }} />
        <div className="hidden md:block absolute bottom-[-100px] left-[-80px] h-[420px] w-[420px] rounded-[38%] blur-2xl opacity-55" style={{ background: "radial-gradient(circle at 30% 70%, rgba(34,197,94,0.08), transparent 36%)" }} />

        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.01) 1px, transparent 2px)", backgroundSize: "4px 4px", opacity: 0.03 }} />
      </div>

      {/* Nav */}
      <header className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-4 md:py-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-10 w-10 md:h-11 md:w-11 rounded-lg bg-white shadow-sm ring-1 ring-gray-100 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Ritual Logo" className="h-auto w-auto " />
            </div>
            <div className="leading-tight">
              <div className="text-base md:text-lg font-semibold tracking-tight text-slate-900">Ritual</div>
              <div className="text-xs text-slate-500">Community Roles</div>
            </div>
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-3">
            <a href="#roles" className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-gray-100 transition">Roles</a>
            <a href="#about" className="rounded-md bg-slate-900 text-white px-3 py-2 text-sm font-semibold hover:opacity-95 transition">About</a>
            <a href="https://x.com/ritualnet" target="_blank" rel="noopener noreferrer" title="X" aria-label="X" className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-gray-100 text-slate-900 hover:shadow-md transition-transform transform hover:-translate-y-0.5">
              <XIcon className="h-5 w-5" />
            </a>
            <a href="https://discord.gg/stVA4xqU" target="_blank" rel="noopener noreferrer" title="Discord" aria-label="Discord" className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-700 shadow-sm hover:brightness-105 transition-transform transform hover:-translate-y-0.5">
              <DiscordIcon className="h-5 w-5" />
            </a>
          </nav>

          {/* mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white shadow-sm ring-1 ring-gray-100 text-slate-900"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile nav panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 rounded-lg shadow-lg p-4 mb-4">
            <div className="flex flex-col gap-3">
              <a href="#roles" className="px-3 py-2 text-sm text-slate-800 rounded-md hover:bg-gray-100">Roles</a>
              <a href="#about" className="px-3 py-2 text-sm text-slate-800 rounded-md hover:bg-gray-100">About</a>
              <div className="flex items-center gap-2 pt-1">
                <a href="https://x.com/ritualnet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white ring-1 ring-gray-100 text-slate-900">
                  <XIcon className="h-5 w-5" /> <span className="text-sm">X</span>
                </a>
                <a href="https://discord.gg/stVA4xqU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-700">
                  <DiscordIcon className="h-5 w-5" /> <span className="text-sm">Discord</span>
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20">
        {/* Hero */}
        <section className="pt-8 sm:pt-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
            
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Ritual{" "}
                <span className="bg-gradient-to-r from-amber-600 to-indigo-600 bg-clip-text text-transparent">
                  Community Roles
                </span>
              </h1>

              <p className="mt-3 sm:mt-4 max-w-xl text-slate-700 leading-relaxed">
                Roles in the Ritual community are given to those who are worthy and prove themselves to be valuable allies in the fight for human-first innovation. Ritualists do not ask for roles they are earned.
              </p>

              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
                <a href="#roles" className="rounded-2xl bg-slate-900 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition">Explore roles</a>
                <a href="#about" className="rounded-2xl bg-white px-4 sm:px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-gray-100 hover:shadow-sm transition">Role meanings</a>
              </div>
            </div>

            {/* Stats card */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">Total holders</div>
                  <div className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">{formatNumber(totalHolders)}</div>
                  <div className="mt-2 text-xs text-slate-400">Based on your provided counts</div>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-3">
                <MiniStat label="Rarest" value="Radiant Ritualist" />
                <MiniStat label="Biggest" value="Community" />
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section id="roles" className="pt-8 sm:pt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">Community Roles</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-[360px]">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search roles… (name, tag, meaning)"
                  className="w-full rounded-2xl bg-white ring-1 ring-gray-100 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-200 transition"
                />
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</div>
              </div>

              <select
                value={activeTier}
                onChange={(e) => setActiveTier(e.target.value)}
                className="w-full sm:w-[190px] rounded-2xl bg-white ring-1 ring-gray-100 px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-200 transition"
              >
                {tiers.map((t) => (
                  <option key={t} value={t} className="bg-white text-slate-800">Filter: {t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* responsive grid: 1 column on xs, 2 on sm, 3 on lg */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <RoleCard key={r.name} role={r} max={59958} onView={() => { setQuery(r.tag || r.name); setActiveTier("All"); try { const el = document.getElementById("roles"); if (el) el.scrollIntoView({ behavior: "smooth" }); } catch {} }} />
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mt-10 sm:mt-12 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">What roles mean</h3>
          <p className="mt-2 text-sm text-slate-700 max-w-3xl leading-relaxed">These are the core community roles and their meanings.</p>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {roles.map((r) => (
              <div key={r.name} className="rounded-lg bg-gray-50 ring-1 ring-gray-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <RoleEmoji tag={r.tag} />
                    <div className="font-semibold text-slate-900">{r.tag}</div>
                  </div>
                  <div className="text-xs text-slate-500">{formatNumber(r.count)} holders</div>
                </div>
                <div className="mt-2 text-sm text-slate-700 leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 pb-8 text-center text-xs text-slate-500">Ritual • Community Roles</footer>
      </main>
    </div>
  );
}

/* ---------- RoleCard + helpers (responsive) ---------- */

function RoleCard({ role, max, onView }) {
  const style = getRarityStyle(role.tier);

  const pct = (() => {
    const safeMax = Math.max(1, max);
    const val = Math.max(0, role.count || 0);
    const w = (Math.log10(val + 1) / Math.log10(safeMax + 1)) * 100;
    return clamp(w, 6, 100);
  })();

  return (
    <div className="group rounded-lg bg-white ring-1 ring-gray-100 p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-slate-500">Role</div>
          <div className="mt-1 text-lg font-semibold tracking-tight text-slate-900 truncate">{role.name}</div>
          {role.tag ? (
            <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
              <RoleEmoji tag={role.tag} />
              <span className="truncate">{role.tag}</span>
            </div>
          ) : null}
        </div>

        <div className={["shrink-0 rounded-full px-3 py-1 text-xs ring-1", style.badge].join(" ")} title="Tier">
          {role.tier}
        </div>
      </div>

      <div className="mt-3 rounded-md bg-gray-50 ring-1 ring-gray-100 p-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xs text-slate-500">Holders</div>
            <div className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">{formatNumber(role.count || 0)}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              title={`View ${role.tag}`}
              className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-gray-100 px-3 py-1 text-xs text-slate-700 hover:shadow-sm transition"
              onClick={() => {
                if (typeof onView === "function") onView();
              }}
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M10 14l6-6M16 14V8H10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">View</span>
            </button>
          </div>
        </div>

        <div className="mt-3 h-2.5 w-full rounded-full bg-gray-100 ring-1 ring-gray-100 overflow-hidden">
          <div className={["h-full rounded-full", style.bar].join(" ")} style={{ width: `${pct}%` }} />
        </div>

        {role.desc ? (
          <div className="mt-3 text-sm text-slate-700 leading-relaxed line-clamp-4">{role.desc}</div>
        ) : null}
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-50 ring-1 ring-gray-100 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function formatNumber(n) {
  try { return new Intl.NumberFormat("en-IN").format(n); } catch { return String(n); }
}
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function getRarityStyle(tier) {
  const t = String(tier || "").toLowerCase();
  if (t === "legendary") return { badge: "bg-amber-50 text-amber-700 ring-amber-100", bar: "bg-gradient-to-r from-amber-400 to-rose-300" };
  if (t === "epic") return { badge: "bg-violet-50 text-violet-700 ring-violet-100", bar: "bg-gradient-to-r from-violet-400 to-fuchsia-400" };
  if (t === "rare") return { badge: "bg-cyan-50 text-cyan-700 ring-cyan-100", bar: "bg-gradient-to-r from-cyan-400 to-emerald-400" };
  if (t === "started") return { badge: "bg-sky-50 text-sky-700 ring-sky-100", bar: "bg-gradient-to-r from-sky-400 to-cyan-300" };
  if (t === "bad") return { badge: "bg-rose-50 text-rose-700 ring-rose-100", bar: "bg-gradient-to-r from-rose-400 to-amber-300" };
  if (t === "common") return { badge: "bg-slate-50 text-slate-700 ring-slate-100", bar: "bg-gradient-to-r from-slate-300 to-slate-400" };
  return { badge: "bg-emerald-50 text-emerald-700 ring-emerald-100", bar: "bg-gradient-to-r from-emerald-400 to-cyan-300" };
}