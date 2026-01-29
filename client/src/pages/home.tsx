import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const profile = {
  name: "Rakesh G",
  headline: "Creative Developer · Engineer · Problem Solver",
  blurb:
    "I build fast, polished interfaces with a taste for motion, systems, and neon-lit details.",
  location: "India",
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:rakesh@example.com",
  },
};

const projects = [
  {
    id: "neon-dashboard",
    title: "Neon Metrics Dashboard",
    description:
      "A rave-grade UI system with animated charts, glass panels, and keyboard-friendly navigation.",
    stack: ["React", "TypeScript", "Recharts"],
    href: "#projects",
  },
  {
    id: "motion-library",
    title: "Motion Component Library",
    description:
      "Reusable micro-interactions (hover glow, magnetic buttons, springy transitions) packaged as components.",
    stack: ["Framer Motion", "Tailwind"],
    href: "#projects",
  },
  {
    id: "three-bg",
    title: "Interactive Orb Backdrop",
    description:
      "Pointer-reactive gradients that feel 3D without heavy rendering cost. Optimized for smoothness.",
    stack: ["Canvas", "CSS", "Motion"],
    href: "#projects",
  },
];

const experience = [
  {
    id: "exp-1",
    title: "Frontend Engineer",
    org: "Your Company",
    timeframe: "2024  Present",
    bullets: [
      "Shipped responsive UI for core flows; improved perceived performance with motion + skeletons.",
      "Built a design system with tokens, components, and accessibility defaults.",
      "Partnered with product to iterate quickly and ship clean, maintainable code.",
    ],
  },
  {
    id: "exp-2",
    title: "Intern / Project Developer",
    org: "Your Org",
    timeframe: "2023  2024",
    bullets: [
      "Prototyped ideas end-to-end with React + TypeScript.",
      "Owned UI polish: spacing, typography, states, and interactions.",
    ],
  },
];

const skills = [
  {
    id: "s-frontend",
    title: "Frontend",
    items: ["React", "TypeScript", "Tailwind", "Accessibility", "Animations"],
  },
  {
    id: "s-backend",
    title: "Backend",
    items: ["Node.js", "REST", "Auth basics"],
  },
  {
    id: "s-tools",
    title: "Tools",
    items: ["Git", "Figma", "Vite", "Testing mindset"],
  },
  {
    id: "s-soft",
    title: "Soft Skills",
    items: ["Communication", "Ownership", "Curiosity", "Problem solving"],
  },
];

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function NeonPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
      data-testid="pill-metadata"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_24px_hsl(var(--primary)/0.45)]" />
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p
          className="font-mono text-xs tracking-widest text-white/55"
          data-testid={`text-kicker-${kicker.toLowerCase()}`}
        >
          {kicker}
        </p>
        <h2
          className="mt-2 text-balance font-[650] text-2xl text-white md:text-3xl"
          data-testid={`text-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <span className="text-neon">{title}</span>
        </h2>
      </div>
      <div className="hidden md:block">
        <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
      </div>
    </div>
  );
}

function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-5 md:p-6",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-0.5",
        className,
      )}
      data-testid="card-glass"
    >
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "glass mt-4 flex items-center justify-between rounded-2xl px-4 py-3",
            "border border-white/10",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/5"
              data-testid="img-avatar"
              aria-hidden="true"
            >
              <span className="font-mono text-sm text-white/80">RG</span>
            </div>
            <div className="leading-tight">
              <div
                className="font-[650] text-white"
                data-testid="text-name-nav"
              >
                {profile.name}
              </div>
              <div
                className="text-xs text-white/55"
                data-testid="text-role-nav"
              >
                {profile.headline}
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {[
              { label: "About", href: "#about" },
              { label: "Experience", href: "#experience" },
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Education", href: "#education" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm text-white/70",
                  "transition-colors hover:bg-white/5 hover:text-white",
                )}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5",
                "transition hover:bg-white/10",
              )}
              data-testid="link-github"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-white/80" strokeWidth={1.8} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5",
                "transition hover:bg-white/10",
              )}
              data-testid="link-linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-white/80" strokeWidth={1.8} />
            </a>
            <a
              href={profile.socials.email}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5",
                "transition hover:bg-white/10",
              )}
              data-testid="link-email"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-white/80" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.9 });
  const smy = useSpring(my, { stiffness: 220, damping: 28, mass: 0.9 });

  const rx = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const ry = useTransform(smx, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      mx.set(x);
      my.set(y);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section className="relative pt-28 md:pt-32" data-testid="section-hero">
      <div className="rave-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <NeonPill>
                <span data-testid="text-location">{profile.location}</span>
                <span className="text-white/35">/</span>
                <span data-testid="text-availability">Available for work</span>
              </NeonPill>

              <h1
                className={cn(
                  "mt-6 font-[700] tracking-[-0.03em]",
                  "text-4xl text-white md:text-6xl",
                )}
                data-testid="text-hero-title"
              >
                <span className="block">{profile.name}</span>
                <span className="mt-2 block text-balance text-white/85">
                  <span className="text-neon">{profile.headline}</span>
                </span>
              </h1>

              <p
                className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg"
                data-testid="text-hero-blurb"
              >
                {profile.blurb}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className={cn(
                    "h-11 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
                    "shadow-[0_0_0_1px_hsl(var(--primary)/0.25)_inset,0_12px_50px_hsl(var(--primary)/0.25)]",
                    "hover:brightness-110",
                  )}
                >
                  <a href="#projects" data-testid="button-view-projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className={cn(
                    "h-11 rounded-xl border-white/15 bg-white/5 text-white",
                    "hover:bg-white/10",
                  )}
                  data-testid="button-download-resume"
                >
                  <Download className="mr-2 h-4 w-4" strokeWidth={2} />
                  Download Resume
                </Button>

                <Link
                  href="#contact"
                  className={cn(
                    "text-sm text-white/70 underline underline-offset-4",
                    "decoration-white/15 hover:text-white",
                  )}
                  data-testid="link-contact"
                >
                  Contact me
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              ref={ref}
              style={mounted ? { rotateX: rx, rotateY: ry } : undefined}
              className={cn(
                "glass relative overflow-hidden rounded-3xl p-5",
                "border border-white/10",
                "[transform-style:preserve-3d]",
              )}
              data-testid="card-hero-visual"
            >
              <div className="noise pointer-events-none absolute inset-0" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-mono text-xs tracking-widest text-white/55"
                      data-testid="text-hero-panel-kicker"
                    >
                      LIVE SIGNAL
                    </div>
                    <div
                      className="mt-2 font-[650] text-white"
                      data-testid="text-hero-panel-title"
                    >
                      System Status
                    </div>
                  </div>
                  <div
                    className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--secondary))] shadow-[0_0_28px_hsl(var(--secondary)/0.55)]"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { label: "UI Polish", value: "A+" },
                    { label: "Speed", value: "Fast" },
                    { label: "Accessibility", value: "Solid" },
                    { label: "Motion", value: "Silky" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      data-testid={`card-metric-${m.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div
                        className="text-xs text-white/55"
                        data-testid={`text-metric-label-${m.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {m.label}
                      </div>
                      <div
                        className="mt-1 text-lg font-[650] text-white"
                        data-testid={`text-metric-value-${m.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div
                    className="text-xs text-white/55"
                    data-testid="text-now-playing-label"
                  >
                    Now playing
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <div>
                      <div
                        className="font-[650] text-white"
                        data-testid="text-now-playing-title"
                      >
                        Neon Focus
                      </div>
                      <div
                        className="font-mono text-xs text-white/55"
                        data-testid="text-now-playing-sub"
                      >
                        Deep work  UI engineering
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.span
                          key={i}
                          className="block w-1.5 rounded-full bg-white/20"
                          style={{ height: 10 + i * 3 }}
                          animate={{ opacity: [0.25, 0.9, 0.25] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.08,
                          }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 md:py-20" data-testid="section-about">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="ABOUT" title="A bit about me" />
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <GlassCard className="md:col-span-7">
            <p className="text-white/75" data-testid="text-about-body">
              Im a frontend-focused developer who loves building interfaces that feel
              alive  smooth transitions, crisp typography, and thoughtful interaction
              design. My sweet spot is turning messy requirements into clean
              components and a cohesive visual system.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Motion", "Design systems", "Performance", "DX"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  data-testid={`pill-about-${t.toLowerCase()}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="md:col-span-5">
            <div className="grid gap-3">
              {[
                { label: "Focus", value: "Frontend + UI" },
                { label: "Style", value: "Dark future / neon" },
                { label: "Strength", value: "Polish + clarity" },
              ].map((i) => (
                <div
                  key={i.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  data-testid={`row-about-${i.label.toLowerCase()}`}
                >
                  <div className="text-sm text-white/65">{i.label}</div>
                  <div className="text-sm font-[650] text-white">{i.value}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="py-16 md:py-20"
      data-testid="section-experience"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="EXPERIENCE" title="Where Ive built" />
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <GlassCard className="md:col-span-5">
            <div className="space-y-4">
              <div
                className="text-white/70"
                data-testid="text-experience-summary"
              >
                I like roles where I can own UI from first principles: tokens 
                components  product polish.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55" data-testid="text-exp-note">
                  Current focus
                </div>
                <div
                  className="mt-1 font-[650] text-white"
                  data-testid="text-exp-focus"
                >
                  Building delightful, performance-friendly interfaces.
                </div>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="md:col-span-7">
            <div className="space-y-5">
              {experience.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  data-testid={`card-experience-${e.id}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div
                        className="font-[650] text-white"
                        data-testid={`text-exp-title-${e.id}`}
                      >
                        {e.title}
                      </div>
                      <div
                        className="text-sm text-white/65"
                        data-testid={`text-exp-org-${e.id}`}
                      >
                        {e.org}
                      </div>
                    </div>
                    <div
                      className="font-mono text-xs text-white/55"
                      data-testid={`text-exp-time-${e.id}`}
                    >
                      {e.timeframe}
                    </div>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                    {e.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        data-testid={`text-exp-bullet-${e.id}-${idx}`}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-16 md:py-20" data-testid="section-skills">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="SKILLS" title="Tools I reach for" />
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          {skills.map((s) => (
            <GlassCard key={s.id} className="md:col-span-6">
              <div className="flex items-center justify-between">
                <div
                  className="font-[650] text-white"
                  data-testid={`text-skill-title-${s.id}`}
                >
                  {s.title}
                </div>
                <div
                  className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_24px_hsl(var(--accent)/0.55)]"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    data-testid={`pill-skill-${s.id}-${i.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="py-16 md:py-20"
      data-testid="section-projects"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="PROJECTS" title="Selected builds" />
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          {projects.map((p) => (
            <GlassCard key={p.id} className="md:col-span-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div
                    className="font-[650] text-white"
                    data-testid={`text-project-title-${p.id}`}
                  >
                    {p.title}
                  </div>
                  <div
                    className="mt-2 text-sm text-white/70"
                    data-testid={`text-project-desc-${p.id}`}
                  >
                    {p.description}
                  </div>
                </div>
                <ArrowRight
                  className="mt-1 h-4 w-4 text-white/40"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    data-testid={`pill-project-${p.id}-${t.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <a
                  href={p.href}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm text-white/70",
                    "hover:text-white",
                  )}
                  data-testid={`link-project-${p.id}`}
                >
                  View details
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
                <div
                  className="h-8 w-8 rounded-full border border-white/10 bg-white/5"
                  aria-hidden="true"
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section
      id="education"
      className="py-16 md:py-20"
      data-testid="section-education"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="EDUCATION" title="Learning timeline" />
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <GlassCard className="md:col-span-7">
            <div className="space-y-4">
              {[
                {
                  id: "edu-1",
                  degree: "B.Tech / BE",
                  school: "Your University",
                  year: "2020  2024",
                  note: "Coursework focused on systems, web, and engineering fundamentals.",
                },
              ].map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  data-testid={`card-education-${e.id}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div
                        className="font-[650] text-white"
                        data-testid={`text-edu-degree-${e.id}`}
                      >
                        {e.degree}
                      </div>
                      <div
                        className="text-sm text-white/65"
                        data-testid={`text-edu-school-${e.id}`}
                      >
                        {e.school}
                      </div>
                    </div>
                    <div
                      className="font-mono text-xs text-white/55"
                      data-testid={`text-edu-year-${e.id}`}
                    >
                      {e.year}
                    </div>
                  </div>
                  <div
                    className="mt-3 text-sm text-white/70"
                    data-testid={`text-edu-note-${e.id}`}
                  >
                    {e.note}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="md:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/55" data-testid="text-edu-tip">
                Highlight
              </div>
              <div
                className="mt-1 font-[650] text-white"
                data-testid="text-edu-highlight"
              >
                Strong fundamentals + taste for UI detail.
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24" data-testid="section-contact">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionTitle kicker="CONTACT" title="Lets build" />
            <p
              className="mt-4 text-white/70"
              data-testid="text-contact-body"
            >
              Want to collaborate or have a role that fits? Send a message and Ill
              get back quickly.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={profile.socials.email}
                className={cn(
                  "glass block rounded-2xl px-4 py-3 text-white/80",
                  "border border-white/10 hover:bg-white/5",
                )}
                data-testid="link-email-cta"
              >
                rakesh@example.com
              </a>
              <div
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
                data-testid="card-contact-note"
              >
                <div className="text-xs text-white/55">Response time</div>
                <div className="mt-1 font-[650] text-white">Within 24 hours</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <GlassCard>
              <form
                className="grid gap-3"
                onSubmit={(e) => e.preventDefault()}
                data-testid="form-contact"
              >
                <div className="grid gap-2">
                  <label
                    className="text-sm text-white/70"
                    htmlFor="name"
                    data-testid="label-name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className={cn(
                      "h-11 rounded-xl border border-white/10 bg-white/5 px-3",
                      "text-white placeholder:text-white/35",
                      "outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.35)]",
                    )}
                    placeholder="Your name"
                    data-testid="input-name"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    className="text-sm text-white/70"
                    htmlFor="email"
                    data-testid="label-email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={cn(
                      "h-11 rounded-xl border border-white/10 bg-white/5 px-3",
                      "text-white placeholder:text-white/35",
                      "outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.35)]",
                    )}
                    placeholder="you@domain.com"
                    data-testid="input-email"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    className="text-sm text-white/70"
                    htmlFor="message"
                    data-testid="label-message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={cn(
                      "rounded-xl border border-white/10 bg-white/5 px-3 py-3",
                      "text-white placeholder:text-white/35",
                      "outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.35)]",
                    )}
                    placeholder="Tell me what youre building"
                    data-testid="input-message"
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <div
                    className="text-xs text-white/50"
                    data-testid="text-contact-footnote"
                  >
                    This is a prototype form (no backend). Itll still feel great.
                  </div>
                  <Button
                    type="submit"
                    className={cn(
                      "h-11 rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
                      "shadow-[0_0_0_1px_hsl(var(--secondary)/0.22)_inset,0_12px_50px_hsl(var(--secondary)/0.22)]",
                      "hover:brightness-110",
                    )}
                    data-testid="button-submit-contact"
                  >
                    Send message
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                  </Button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>

        <footer
          className="mt-14 border-t border-white/10 pt-8"
          data-testid="footer"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/55" data-testid="text-copyright">
               {new Date().getFullYear()} {profile.name}
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                data-testid="link-footer-github"
              >
                GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                data-testid="link-footer-linkedin"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default function Home() {
  const bg = useMemo(() => {
    return [
      "radial-gradient(900px circle at 30% 20%, hsl(268 96% 66% / 0.20), transparent 60%)",
      "radial-gradient(900px circle at 75% 10%, hsl(200 96% 62% / 0.16), transparent 60%)",
      "radial-gradient(1000px circle at 55% 80%, hsl(316 95% 64% / 0.12), transparent 65%)",
    ].join(",");
  }, []);

  return (
    <div className="min-h-dvh" data-testid="page-home" style={{ backgroundImage: bg }}>
      <TopNav />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
