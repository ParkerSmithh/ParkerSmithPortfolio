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
    image: "",
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

export type Screenshot = { id: string; label: string; src?: string; alt: string };

/** Cybercab Hunter screenshots. Recommended: desktop 2880×1800 (16:10), mobile 1170×2532. Save as .webp. */
export const cybercabScreens = {
  desktop: [
    { id: "home", label: "Homepage", src: "", alt: "Cybercab Hunter homepage with live fleet map" },
    { id: "dashboard", label: "Dashboard", src: "", alt: "Cybercab Hunter dashboard with ride statistics" },
    { id: "vehicles", label: "Vehicles", src: "", alt: "Cybercab Hunter known vehicle registry" },
  ] as Screenshot[],
  mobile: { id: "mobile", label: "Mobile", src: "", alt: "Cybercab Hunter on a phone" } as Screenshot,
};
