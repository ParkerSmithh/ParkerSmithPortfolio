import { motion } from "motion/react";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "../data/portfolio";
import { DrawLine } from "./AnimatedSection";

function academicProgress() {
  const start = new Date(education.start).getTime();
  const end = new Date(education.end).getTime();
  const now = Date.now();
  const pct = Math.min(1, Math.max(0, (now - start) / (end - start)));
  const year = Math.min(4, Math.max(1, Math.floor((now - start) / (365.25 * 864e5)) + 1));
  return { pct, year, done: now >= end };
}

export function AboutEducation() {
  const { pct, year, done } = academicProgress();
  const startYear = new Date(education.start).getFullYear();
  const endYear = new Date(education.end).getFullYear();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <section id="about" aria-labelledby="edu-school" className="py-20 md:py-28">
      <div className="container-page">
        <motion.article
          className="card relative mx-auto max-w-5xl overflow-hidden p-6 md:p-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-sky-tint" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-end md:gap-12">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-card bg-blue text-white">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </div>
              <p className="t-eyebrow mt-6 text-blue">Education</p>
              <h2 id="edu-school" className="mt-2 text-3xl font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.1]">
                {education.school}
              </h2>
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-graphite">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {education.location}
              </p>
            </div>
            <dl className="grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-1">
              <div>
                <dt className="text-stone">Program</dt>
                <dd className="mt-0.5 text-lg font-semibold">{education.degree}</dd>
              </div>
              <div>
                <dt className="text-stone">Dates</dt>
                <dd className="mt-0.5 text-lg font-semibold">{education.dates}</dd>
              </div>
            </dl>
          </div>

          <DrawLine className="relative my-8" />

          {/* Academic timeline */}
          <div className="relative">
            <div className="flex items-baseline justify-between text-xs font-medium text-stone">
              <span>Academic timeline</span>
              <span className="text-ink">{done ? "Graduated" : `Year ${year} of 4`}</span>
            </div>
            <div
              className="relative mt-3 h-2 rounded-full bg-paper"
              role="progressbar"
              aria-label="Progress toward graduation"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct * 100)}
            >
              <motion.div
                className="absolute inset-y-0 left-0 origin-left rounded-full bg-blue"
                style={{ width: `${pct * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </div>
            <ol className="mt-2 flex justify-between text-[0.6875rem] text-stone" aria-hidden>
              {years.map((y) => (
                <li key={y}>{y}</li>
              ))}
            </ol>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
