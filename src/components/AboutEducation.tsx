import { motion } from "motion/react";
import { BookOpen, Box, Gamepad2, GraduationCap, Layers, MapPin, PenTool } from "lucide-react";
import { about, education } from "../data/portfolio";
import { DrawLine, Reveal, SectionHeading, Stagger, StaggerItem } from "./AnimatedSection";

const COURSE_ICONS = [Gamepad2, Box, PenTool, Layers];
const COURSE_TONES = ["bg-marigold text-ink", "bg-sky text-ink", "bg-coral text-white", "bg-midnight text-white"];

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
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="about-title" eyebrow="About me" title="Design and technology, in the same hands." />
            <Reveal delay={0.15}>
              <p className="t-lead mt-8 text-ink">{about.lead}</p>
            </Reveal>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.2 + i * 0.06}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-graphite md:text-[1.0625rem]">{p}</p>
              </Reveal>
            ))}
            <Stagger as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.05}>
              {about.disciplines.map((d) => (
                <StaggerItem as="li" key={d} className="pill border border-hairline bg-white text-ink/80">
                  {d}
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <article className="card relative overflow-hidden p-6 md:p-8" aria-labelledby="edu-school">
              <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-tint" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-card bg-blue text-white">
                  <GraduationCap className="h-6 w-6" aria-hidden />
                </div>
                <p className="t-eyebrow mt-6 text-stone">Education</p>
                <h3 id="edu-school" className="t-heading-sm mt-2">
                  {education.school}
                </h3>
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-graphite">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {education.location}
                </p>
                <DrawLine className="my-6" />
                <dl className="grid gap-4 text-sm">
                  <div>
                    <dt className="text-stone">Program</dt>
                    <dd className="mt-0.5 text-base font-semibold">{education.degree}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">Dates</dt>
                    <dd className="mt-0.5 text-base font-semibold">{education.dates}</dd>
                  </div>
                </dl>

                {/* Academic timeline */}
                <div className="mt-8">
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
              </div>
            </article>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-20">
          <Reveal>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <BookOpen className="h-4 w-4 text-blue" aria-hidden />
              Relevant coursework
            </h3>
          </Reveal>
          <Stagger as="ul" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {education.coursework.map((course, i) => {
              const Icon = COURSE_ICONS[i % COURSE_ICONS.length];
              return (
                <StaggerItem as="li" key={course} className="h-full">
                  <div className="card group flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-200 hover:border-black/20">
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-button ${
                          COURSE_TONES[i % COURSE_TONES.length]
                        }`}
                      >
                        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" aria-hidden />
                      </span>
                      <span className="text-xs font-medium tabular-nums text-stone">0{i + 1}</span>
                    </div>
                    <p className="text-lg font-semibold leading-snug tracking-tight">{course}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
