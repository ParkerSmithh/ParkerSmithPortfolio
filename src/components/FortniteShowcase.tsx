import { motion, useScroll, useTransform } from "motion/react";
import { Check, Copy, ExternalLink, Play } from "lucide-react";
import { useRef } from "react";
import { fortnite } from "../data/portfolio";
import { fortniteGames, type FortniteGame } from "../data/projects";
import { thumbnailFor } from "../data/videos";
import { useCopy } from "../lib/useCopy";
import { ClipReveal, DrawLine, Reveal, SectionHeading, Stagger, StaggerItem } from "./AnimatedSection";
import { Sparkle } from "./Decorations";
import { useVideoPlayer } from "./VideoPlayerProvider";

export function FortniteShowcase() {
  return (
    <section id="fortnite" aria-labelledby="fortnite-title" className="py-10 md:py-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-card bg-midnight px-5 py-16 text-white sm:px-10 md:py-24 xl:px-16">
          <Sparkle className="absolute right-8 top-10 hidden h-10 w-10 md:block" color="#ffb110" />

          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading dark id="fortnite-title" eyebrow="Game development · UEFN" title="Fortnite Creative" intro={fortnite.summary} />
            </div>
          </div>

          <Stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-3" stagger={0.1}>
            {fortnite.stats.map((s, i) => (
              <StaggerItem as="li" key={s.label} className="bg-midnight">
                <div className="h-full p-6 md:p-8">
                  <p
                    className={`font-bold tracking-[-0.04em] ${
                      s.value.length > 4 ? "text-4xl md:text-5xl" : "text-5xl md:text-7xl"
                    } ${i === 0 ? "text-marigold" : "text-white"}`}
                  >
                    {s.value}
                  </p>
                  <p className="mt-2 text-base text-white/70">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-14">
            <Reveal>
              <h3 className="text-sm font-semibold text-white/90">What I did</h3>
            </Reveal>
            <Stagger as="ul" className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {fortnite.responsibilities.map((r) => (
                <StaggerItem as="li" key={r} className="flex items-start gap-3 text-[0.9375rem] text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-marigold text-midnight">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {r}
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <DrawLine dark className="my-16 md:my-20" />

          <div className="grid gap-20 md:gap-28">
            {fortniteGames.map((g, i) => (
              <GameCaseStudy key={g.id} game={g} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GameCaseStudy({ game, index }: { game: FortniteGame; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { open } = useVideoPlayer();
  const { copied, copy } = useCopy();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const reversed = index % 2 === 1;
  const thumb = game.thumbnail || thumbnailFor(game.video);
  const playable = Boolean(game.video.streamUid);
  const titleId = `${game.id}-title`;

  return (
    <article ref={ref} aria-labelledby={titleId} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
        <ClipReveal className="group relative aspect-video overflow-hidden rounded-card bg-[#0a1250]">
          <motion.div className="absolute inset-[-7%]" style={{ y }}>
            {thumb ? (
              <img src={thumb} alt={game.thumbnailAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            ) : (
              <GamePlaceholder index={index} />
            )}
          </motion.div>
          <button
            type="button"
            onClick={() => open(game.video)}
            disabled={!playable}
            className="absolute inset-0 flex items-center justify-center rounded-card bg-black/0 transition-colors duration-300 enabled:hover:bg-black/25 disabled:cursor-default"
            aria-label={playable ? `Play gameplay video: ${game.title}` : `${game.title} gameplay video coming soon`}
          >
            <span
              className={`flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 ${
                playable ? "bg-white text-midnight group-hover:scale-110" : "bg-white/15 text-white/80"
              }`}
            >
              <Play className="ml-1 h-8 w-8" fill="currentColor" aria-hidden />
            </span>
          </button>
          {!playable && (
            <span className="pointer-events-none absolute left-4 top-4 pill bg-marigold text-xs text-ink">Video awaiting upload</span>
          )}
        </ClipReveal>
      </div>

      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
        <Reveal>
          <p className="t-eyebrow text-sky">Featured game 0{index + 1}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 id={titleId} className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.1]">
            {game.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-white/70">{game.description}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-7 grid gap-5 text-sm">
            <div>
              <dt className="text-white/50">Responsibilities</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {game.responsibilities.map((r) => (
                  <span key={r} className="pill bg-white/10 text-white/90">
                    {r}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-white/50">Built with</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {game.technologies.map((t) => (
                  <span key={t} className="pill border border-white/15 text-white/80">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            {game.islandCode && (
              <div>
                <dt className="text-white/50">Island code</dt>
                <dd className="mt-2 flex items-center gap-2">
                  <code className="rounded-small bg-white/10 px-2.5 py-1.5 font-mono text-base tracking-wider">{game.islandCode}</code>
                  <button
                    type="button"
                    className="btn btn-outline-dark min-h-9 px-3 py-1.5 text-sm"
                    onClick={() => copy(game.id, game.islandCode!)}
                  >
                    {copied === game.id ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                    {copied === game.id ? "Copied" : "Copy"}
                  </button>
                  <span className="sr-only" aria-live="polite">
                    {copied === game.id ? "Island code copied to clipboard" : ""}
                  </span>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <button type="button" className="btn btn-on-dark disabled:opacity-50" onClick={() => open(game.video)} disabled={!playable}>
              <Play className="h-4 w-4" fill="currentColor" aria-hidden />
              {playable ? "Play Video" : "Video coming soon"}
            </button>
            {game.link && (
              <a href={game.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                View island
                <ExternalLink className="h-4 w-4" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function GamePlaceholder({ index }: { index: number }) {
  const accent = index === 0 ? "#ffb110" : "#f64932";
  const second = index === 0 ? "#62aef0" : "#ffb110";
  return (
    <svg aria-hidden viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="640" height="360" fill="#0a1250" />
      <g stroke="#fff" strokeOpacity="0.06">
        {Array.from({ length: 26 }, (_, i) => (
          <line key={i} x1={i * 26} y1="0" x2={i * 26} y2="360" />
        ))}
      </g>
      <circle cx={index === 0 ? 500 : 140} cy="90" r="60" fill={accent} />
      <ellipse cx="320" cy="320" rx="360" ry="70" fill="#097fe8" opacity="0.6" />
      <path d="M40 320 C140 180 220 150 320 210 S520 150 620 320 Z" fill={second} opacity="0.85" />
      <path d="M150 320 C210 240 270 230 330 260 S450 230 520 320 Z" fill="#02093a" />
      <text x="40" y="104" fill="#fff" opacity="0.75" fontFamily="Inter, system-ui" fontSize="14" fontWeight="600" letterSpacing="2">
        {`GAME 0${index + 1} · KEY ART SLOT`}
      </text>
    </svg>
  );
}
