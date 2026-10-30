import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { asset } from "../lib/asset";
import { projectCards, type ProjectCard } from "../data/projects";
import { SectionHeading } from "./AnimatedSection";
import { projectArt } from "./ProjectArt";

const LAYOUT: Record<string, string> = {
  youtube: "lg:col-span-7 lg:row-span-2",
  fortnite: "lg:col-span-5",
  cybercab: "lg:col-span-5",
};

const CHIP: Record<ProjectCard["accent"], string> = {
  coral: "bg-coral/12 text-[#b4280f]",
  marigold: "bg-marigold/25 text-[#7a4f00]",
  midnight: "bg-sky-tint text-blue",
};

function Card({ card, index }: { card: ProjectCard; index: number }) {
  const Art = projectArt[card.id as keyof typeof projectArt];
  const large = card.id === "youtube";
  return (
    <motion.li
      className={`${LAYOUT[card.id] ?? "lg:col-span-6"} min-h-0`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <a
        href={`#${card.target}`}
        className="card group flex h-full flex-col overflow-hidden transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-black/20"
      >
        <div className={`relative overflow-hidden ${large ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[16/9]"}`}>
          {card.image ? (
            <img
              src={asset(card.image)}
              alt={card.imageAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            Art && <Art />
          )}
        </div>
        <div className="flex items-end justify-between gap-6 p-6 md:p-7">
          <div>
            <span className={`pill ${CHIP[card.accent]}`}>{card.category}</span>
            <h3 className={`mt-3 font-bold tracking-tight ${large ? "text-2xl md:text-[1.75rem]" : "text-xl md:text-[1.375rem]"}`}>
              {card.title}
            </h3>
            <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-graphite">{card.description}</p>
          </div>
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline transition-all duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white"
          >
            <ArrowDownRight className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" />
          </span>
        </div>
      </a>
    </motion.li>
  );
}

export function ProjectsOverview() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="projects-title"
            eyebrow="Selected work"
            title="Three projects, three crafts."
            intro="Video production, game development, and web development — each one shipped to a real audience."
          />
        </div>
        <ul className="mt-12 grid gap-4 md:gap-5 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-12">
          {projectCards.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
