/**
 * Project content: overview cards, Fortnite case studies, and Cybercab Hunter screenshots.
 * Image paths are relative to /public. Leave `image` empty to show a designed placeholder.
 */
import { fortniteVideos, type VideoEntry } from "./videos";

export type ProjectCard = {
  id: string;
  target: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  imageAlt: string;
  accent: "coral" | "marigold" | "midnight";
};

export const projectCards: ProjectCard[] = [
  {
    id: "youtube",
    target: "youtube",
    title: "Gaming YouTube Channel",
    category: "Video Production",
    description:
      "Produced gaming videos and short-form content for a YouTube channel reaching 33,000 subscribers.",
    image: "",
    imageAlt: "Preview of Parker Smith's gaming YouTube channel",
    accent: "coral",
  },
  {
    id: "fortnite",
    target: "fortnite",
    title: "Fortnite Creative / UEFN",
    category: "Game Development",
    description:
      "Designed, developed, published, and promoted interactive Fortnite games using Unreal Editor for Fortnite.",
    image: "",
    imageAlt: "Preview of a Fortnite island built in UEFN",
    accent: "marigold",
  },
  {
    id: "cybercab",
    target: "cybercab",
    title: "Cybercab Hunter",
    category: "Web Development",
    description:
      "Created an interactive website for tracking Tesla Cybercab vehicles, reported sightings, and user-submitted ride statistics.",
    image: "/images/cybercabhunter/01-home.webp",
    imageAlt: "Cybercab Hunter website homepage",
    accent: "midnight",
  },
];

export type FortniteGame = {
  id: string;
  /** Placeholder until real details are provided. */
  title: string;
  description: string;
  thumbnail?: string;
  thumbnailAlt: string;
  responsibilities: string[];
  technologies: string[];
  video: VideoEntry;
  /** Optional, e.g. "1234-5678-9012". Hidden when empty. */
  islandCode?: string;
  /** Optional link to the island page. Hidden when empty. */
  link?: string;
  placeholder?: boolean;
};

export const fortniteGames: FortniteGame[] = [
  {
    id: "game-1",
    title: "Featured Game 1 — Title Coming Soon",
    description:
      "Placeholder: describe the game's concept, how it plays, and what made it work. Details will be added.",
    thumbnail: "",
    thumbnailAlt: "Key art for featured Fortnite game 1",
    responsibilities: ["Level design", "Gameplay mechanics with Creative devices", "Playtesting & iteration"],
    technologies: ["UEFN", "Unreal Engine", "Fortnite Creative devices"],
    video: fortniteVideos["game-1"],
    islandCode: "",
    link: "",
    placeholder: true,
  },
  {
    id: "game-2",
    title: "Featured Game 2 — Title Coming Soon",
    description:
      "Placeholder: describe the game's concept, how it plays, and what made it work. Details will be added.",
    thumbnail: "",
    thumbnailAlt: "Key art for featured Fortnite game 2",
    responsibilities: ["Asset placement & landscaping", "Gameplay mechanics with Creative devices", "Promotion via YouTube Shorts"],
    technologies: ["UEFN", "Unreal Engine", "Fortnite Creative devices"],
    video: fortniteVideos["game-2"],
    islandCode: "",
    link: "",
    placeholder: true,
  },
];

export type TourShot = {
  id: string;
  /** Short label for the step buttons. */
  label: string;
  title: string;
  caption: string;
  /** Path under /public. Use the same order as the live site's homepage. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Cybercab Hunter screenshot tour, in the order the sections appear on cybercabhunter.com. */
export const cybercabTour: TourShot[] = [
  {
    id: "home",
    label: "Home",
    title: "Track the future of autonomy",
    caption: "The landing hero: crowdsourced sightings and live stats for Tesla's autonomous Cybercab fleet in Austin.",
    src: "/images/cybercabhunter/01-home.webp",
    alt: "Cybercab Hunter homepage hero reading 'Track the future of autonomy' beside a gold Cybercab",
    width: 2400,
    height: 1181,
  },
  {
    id: "live",
    label: "Live stats",
    title: "Live fleet stats",
    caption:
      "Registry, ride, and sighting counts, a live service-hours tracker, and a daily recap of new Cybercabs, DMV additions, sightings, and detections.",
    src: "/images/cybercabhunter/02-live-stats.webp",
    alt: "Live stats panel with registered Cybercabs, total rides, sightings, a service-day timeline, and the Cybercab Daily summary",
    width: 2400,
    height: 880,
  },
  {
    id: "growth",
    label: "Fleet growth",
    title: "Austin service zone & fleet growth",
    caption:
      "A minimap of the published Austin service zone next to a chart of Cybercabs documented in the registry over time — with a timelapse.",
    src: "/images/cybercabhunter/03-fleet-growth.webp",
    alt: "Austin service-zone minimap beside a Cybercab fleet growth chart with daily additions",
    width: 2400,
    height: 938,
  },
  {
    id: "dmv",
    label: "DMV data",
    title: "Texas DMV registrations",
    caption:
      "Every automated vehicle Tesla lists with the state, charted by date and split between Cybercab and Model Y.",
    src: "/images/cybercabhunter/04-dmv-registrations.webp",
    alt: "Texas DMV registrations chart comparing Cybercab and Model Y automated-vehicle registrations over time",
    width: 2400,
    height: 1021,
  },
];
