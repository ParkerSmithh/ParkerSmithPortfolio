import { Box, Code2, Gamepad2, Palette, Sparkles, Video } from "lucide-react";
import { skills, type SkillGroup, type SkillIcon, type SkillTone } from "../data/skills";
import { SectionHeading, Stagger, StaggerItem } from "./AnimatedSection";

const ICONS: Record<SkillIcon, typeof Box> = {
  palette: Palette,
  gamepad: Gamepad2,
  code: Code2,
  box: Box,
  sparkles: Sparkles,
  video: Video,
};

const TONES: Record<SkillTone, { card: string; icon: string; item: string; deco: string }> = {
  white: { card: "card hover:border-black/20", icon: "bg-paper text-ink", item: "bg-paper text-ink/85", deco: "bg-sky-tint" },
  marigold: { card: "bg-marigold", icon: "bg-white text-ink", item: "bg-white/70 text-ink", deco: "bg-white/40" },
  sky: { card: "bg-sky", icon: "bg-white text-ink", item: "bg-white/70 text-ink", deco: "bg-white/35" },
  midnight: { card: "bg-midnight text-white", icon: "bg-white/10 text-marigold", item: "bg-white/10 text-white", deco: "bg-white/5" },
  coral: { card: "bg-coral", icon: "bg-white text-ink", item: "bg-white/70 text-ink", deco: "bg-white/30" },
  peach: { card: "bg-peach", icon: "bg-white text-ink", item: "bg-white/70 text-ink", deco: "bg-white/40" },
};

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = ICONS[group.icon];
  const t = TONES[group.tone];
  return (
    <article
      className={`group relative h-full overflow-hidden rounded-card p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 md:p-7 ${t.card}`}
      aria-labelledby={`skill-${group.id}`}
    >
      <span
        aria-hidden
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full transition-transform duration-500 ease-out group-hover:scale-125 ${t.deco}`}
      />
      <div className="relative">
        <span className={`flex h-12 w-12 items-center justify-center rounded-card ${t.icon}`}>
          <Icon
            className="h-6 w-6 transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110"
            aria-hidden
          />
        </span>
        <h3 id={`skill-${group.id}`} className="t-heading-sm mt-8">
          {group.title}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <li key={item} className={`pill ${t.item}`}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills & tools"
          title="The toolkit."
          intro="The software I use across design, games, code, 3D, AI, and video."
        />
        <Stagger as="ul" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4" stagger={0.07}>
          {skills.map((g) => (
            <StaggerItem as="li" key={g.id}>
              <SkillCard group={g} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
