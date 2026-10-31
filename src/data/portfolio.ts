import { asset } from "../lib/asset";

/**
 * Central portfolio content. Every fact here comes from "Resume - Parker Smith.pdf".
 * Edit this file to update copy — components only read from it.
 *
 * Privacy: the residential street address is intentionally NOT stored anywhere in this site.
 */

export const contact = {
  name: "Parker Smith",
  email: "joeclos@duck.com",
  phone: "214-973-1266",
  phoneDisplay: "(214) 973-1266",
  location: "Dallas, Texas",
  emailHref: "mailto:joeclos@duck.com",
  phoneHref: "tel:+12149731266",
};

/** Swap this file in /public to replace the resume (e.g. a public-facing version without the address). */
export const resume = {
  href: asset("/resume.pdf"),
  downloadName: "Parker-Smith-Resume.pdf",
};

/** Optional profiles. Leave empty ("") and the link is hidden — never shown broken. */
export const socials = {
  linkedin: "",
  github: "",
};

export const site = {
  /** Public URL of the deployed site. */
  url: "https://parkersmithh.github.io/ParkerSmithPortfolio/",
  title: "Parker Smith | Creative Computing & Graphic Design Portfolio",
  focus: "Creative Computing & Graphic Design",
};

export const hero = {
  categories: ["Graphic Design", "Web Development", "Game Development", "Video Production"],
  /** Rendered as "<lead> <highlight>", with the highlight in a yellow pill. */
  headlineLead: "Parker",
  headlineHighlight: "Smith",
  description:
    "I'm a Creative Computing and Graphic Design student at Southern Methodist University, creating interactive digital experiences through web development, game design, graphic design, and video production.",
};

export const about = {
  lead: "I work where design meets technology — taking an idea from a sketch to something people can click, watch, or play.",
  paragraphs: [
    "I'm studying Creative Computing and Graphic Design at Southern Methodist University. My work moves between disciplines: designing thumbnails and graphics in Photoshop and Illustrator, editing and recording videos for a gaming YouTube channel, building and publishing games in Unreal Editor for Fortnite, and developing an interactive website for tracking Tesla Cybercabs.",
    "What ties it together is an interest in combining creative design with technology to make digital experiences that feel considered — and that real people actually use.",
  ],
  disciplines: [
    "Graphic design",
    "Interactive web development",
    "Video editing & production",
    "Game development",
    "3D design",
    "Programming",
  ],
};

export const education = {
  school: "Southern Methodist University",
  location: "Dallas, Texas",
  degree: "Creative Computing, Graphic Design",
  dates: "August 2024 – May 2028",
  start: "2024-08-01",
  end: "2028-05-15",
};

export const youtube = {
  title: "Gaming YouTube Channel",
  content: "Fortnite videos",
  stats: [
    { value: 33, suffix: "K", label: "Subscribers" },
    { value: 500, suffix: "", label: "Videos" },
    { value: 500, suffix: "", label: "Shorts" },
  ],
  /** Screenshot of the channel page, shown at the top of the section. */
  channelShot: {
    src: "/images/youtube/channel.webp",
    alt: "The Gopex YouTube channel page: 'Epic Gaming Content' banner, pizza-slice avatar, and a row of recent Fortnite and gaming videos",
    width: 1314,
    height: 1021,
  },
  responsibilities: [
    { title: "Video Editing", tool: "Adobe Premiere Pro", icon: "scissors" },
    { title: "Video Recording", tool: "OBS Studio", icon: "record" },
    { title: "Thumbnail Design", tool: "Adobe Photoshop", icon: "image" },
  ] as const,
};

export const fortnite = {
  title: "Fortnite Creative",
  summary:
    "I built and published Fortnite games using Unreal Editor for Fortnite (UEFN). One of them reached about 1,000 concurrent players at its peak and generated revenue through Fortnite's creator ecosystem.",
  stats: [
    { value: "11", label: "Published Fortnite games" },
    { value: "~1000", label: "Peak concurrent players on one game" },
    { value: "Monetized", label: "Through Fortnite's creator ecosystem" },
  ],
  responsibilities: [
    "Published 11 games on Fortnite",
    "Level design in Unreal Engine / UEFN",
    "Asset placement and landscaping",
    "Built gameplay mechanics with Fortnite Creative devices",
    "Tested and iterated on game design and gameplay",
    "Promoted games through YouTube Shorts",
  ],
};

export const cybercab = {
  title: "Cybercab Hunter",
  url: "https://cybercabhunter.com/",
  displayUrl: "cybercabhunter.com",
  description:
    "Built a website with Claude Code that tracks Tesla Cybercab autonomous vehicles, including known Cybercabs, reported camera sightings, and user-submitted ride statistics.",
  features: [
    { title: "Cybercab Vehicle Tracking", body: "A registry of known Cybercabs, each with its own record page.", accent: "marigold" },
    { title: "Reported Sightings", body: "Camera sightings reported by the community, collected in one place.", accent: "coral" },
    { title: "User-Submitted Ride Statistics", body: "Riders submit their trips; the site turns them into shared stats.", accent: "sky" },
    { title: "Interactive Website Experience", body: "Maps, animated counters, and pages built to be explored.", accent: "midnight" },
  ] as const,
};

export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "youtube", label: "YouTube" },
  { id: "fortnite", label: "Fortnite" },
  { id: "cybercab", label: "Cybercab" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
