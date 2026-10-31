import { Disc, ImageIcon, Scissors } from "lucide-react";
import { youtube } from "../data/portfolio";
import { youtubeVideos } from "../data/videos";
import { asset } from "../lib/asset";
import { ClipReveal, Reveal, SectionHeading, Stagger, StaggerItem } from "./AnimatedSection";
import { CountUp } from "./CountUp";
import { Squiggle } from "./Decorations";
import { VideoCard } from "./VideoCard";

const RESP_ICONS = { scissors: Scissors, record: Disc, image: ImageIcon } as const;
const STAT_STYLES = ["bg-coral text-ink", "card", "card"];

export function YouTubeShowcase() {
  const [featured, ...rest] = youtubeVideos;
  return (
    <section id="youtube" aria-labelledby="youtube-title" className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="youtube-title"
              eyebrow="Video production"
              title={
                <>
                  {youtube.title}
                  <Squiggle className="ml-3 inline-block h-5 w-20 align-middle md:h-6 md:w-24" />
                </>
              }
            />
            <Stagger as="ul" className="mt-8 grid gap-3" stagger={0.08}>
              {youtube.responsibilities.map((r) => {
                const Icon = RESP_ICONS[r.icon];
                return (
                  <StaggerItem as="li" key={r.title}>
                    <div className="card group flex items-center gap-4 p-4 transition-colors duration-200 hover:border-black/20">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-paper text-ink transition-colors duration-200 group-hover:bg-coral group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-semibold">{r.title}</p>
                        <p className="text-sm text-graphite">{r.tool}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          <ClipReveal className="lg:col-span-7">
            <ChannelShot />
          </ClipReveal>
        </div>

        <Stagger as="ul" className="mt-12 grid gap-3 sm:grid-cols-3 md:gap-4" stagger={0.1}>
          {youtube.stats.map((s, i) => (
            <StaggerItem as="li" key={s.label}>
              <div className={`${STAT_STYLES[i]} rounded-card p-6 md:p-8`}>
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  className="block text-5xl font-bold tracking-[-0.04em] md:text-6xl lg:text-7xl"
                />
                <p className={`mt-2 text-base font-medium ${i === 0 ? "text-ink" : "text-graphite"}`}>{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 md:mt-20">
          <Reveal>
            <h3 className="t-heading-sm">Featured videos</h3>
          </Reveal>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:col-span-7">
              <VideoCard video={featured} featured index={0} />
            </Reveal>
            <Stagger as="ul" className="grid content-start gap-5 lg:col-span-5" stagger={0.08}>
              {rest.map((v, i) => (
                <StaggerItem as="li" key={v.id}>
                  <VideoCard video={v} index={i + 1} compact />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelShot() {
  const shot = youtube.channelShot;
  return (
    <figure className="overflow-hidden rounded-card border border-hairline bg-white shadow-mockup">
      <div className="flex gap-1.5 border-b border-hairline bg-[#fbfaf9] px-4 py-3" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <img
        src={asset(shot.src)}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  );
}
