import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from "lucide-react";
import { contact, resume, socials } from "../data/portfolio";
import { useCopy } from "../lib/useCopy";
import { Reveal } from "./AnimatedSection";
import { Arrow, Flower, Sparkle } from "./Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = ["Let's", "build", "something", "great."];

export function Contact() {
  const { copied, copy } = useCopy();
  const links = [
    { label: "LinkedIn", href: socials.linkedin },
    { label: "GitHub", href: socials.github },
  ].filter((l) => l.href);

  const rows = [
    {
      key: "email",
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: contact.emailHref,
      copyText: contact.email,
    },
    {
      key: "phone",
      icon: Phone,
      label: "Phone",
      value: contact.phoneDisplay,
      href: contact.phoneHref,
      copyText: contact.phoneDisplay,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-36">
      <Sparkle className="absolute left-[6%] top-24 hidden h-10 w-10 md:block" color="#ffb110" />
      <Flower className="absolute right-[7%] top-32 hidden h-14 w-14 md:block" color="#f64932" />

      <div className="container-page">
        <p className="t-eyebrow text-blue">Contact</p>
        <h2 id="contact-title" className="t-display mt-5 max-w-5xl">
          {HEADLINE.map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${w === "great." ? "rounded-full bg-sky-tint px-[0.28em] text-blue" : ""}`}
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              >
                {w}
              </motion.span>
              {i < HEADLINE.length - 1 && " "}
            </span>
          ))}
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={0.2}>
            <p className="t-lead text-graphite">
              I'm open to internships, creative collaborations, and conversations with teams working on design, games,
              video, or interactive web. The fastest way to reach me is email.
            </p>
            <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-graphite">
              <MapPin className="h-4 w-4" aria-hidden />
              Based in {contact.location}
            </p>
            <Arrow className="mt-6 hidden h-16 w-20 lg:block" color="#615d59" />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.25}>
              <ul className="card divide-y divide-hairline overflow-hidden">
                {rows.map((r) => {
                  const Icon = r.icon;
                  const isCopied = copied === r.key;
                  return (
                    <li key={r.key} className="flex items-center gap-3 p-4 sm:gap-5 sm:p-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-paper">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-stone">{r.label}</p>
                        <a
                          href={r.href}
                          className="block truncate rounded-small text-xl font-semibold tracking-tight underline decoration-black/15 decoration-2 underline-offset-4 transition-colors hover:decoration-blue sm:text-2xl md:text-[1.75rem]"
                        >
                          {r.value}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => copy(r.key, r.copyText)}
                        className={`btn shrink-0 px-3 sm:px-4 ${isCopied ? "bg-[#e8f6ec] text-[#1a7f37]" : "btn-outline"}`}
                        aria-label={`Copy ${r.label.toLowerCase()}`}
                      >
                        {isCopied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                        <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy"}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="sr-only" aria-live="polite">
                {copied === "email" ? "Email address copied to clipboard" : copied === "phone" ? "Phone number copied to clipboard" : ""}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <a href={contact.emailHref} className="btn btn-primary">
                  <Mail className="h-4 w-4" aria-hidden />
                  Email Me
                </a>
                <a href={contact.phoneHref} className="btn btn-ghost">
                  <Phone className="h-4 w-4" aria-hidden />
                  Call Me
                </a>
                <a href={resume.href} download={resume.downloadName} className="btn btn-outline">
                  <Download className="h-4 w-4" aria-hidden />
                  Download Resume
                </a>
                {links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-text">
                    {l.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
