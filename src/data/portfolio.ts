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
  href: "/resume.pdf",
  downloadName: "Parker-Smith-Resume.pdf",
};

/** Optional profiles. Leave empty ("") and the link is hidden — never shown broken. */
export const socials = {
  linkedin: "",
  github: "",
};

export const site = {
  /** Set to the deployed origin (e.g. "https://parkersmith.dev") so share images resolve absolutely. */
  url: "",
  title: "Parker Smith | Creative Computing & Graphic Design Portfolio",
  focus: "Creative Computing & Graphic Design",
};

export const hero = {
  categories: ["Graphic Design", "Web Development", "Game Development", "Video Production"],
  headlineLead: "Designing ideas.",
  headlineVerb: "Building",
  headlineHighlight: "experiences.",
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
  coursework: [
    "Game Design",
    "Art of 3D Modeling & Animation",
    "Intro to Graphic Design",
    "Digital Hybrid Media I",
  ],
};

export const youtube = {
  title: "Gaming YouTube Channel",
  content: "Fortnite and Minecraft videos",
  stats: [
    { value: 33, suffix: "K", label: "Subscribers" },
    { value: 500, suffix: "", label: "Videos" },
    { value: 500, suffix: "", label: "Shorts" },
  ],
  statsNote: "Figures as reported on my resume — not live channel metrics.",
  responsibilities: [
    { title: "Video Editing", tool: "Adobe Premiere Pro", icon: "scissors" },
    { title: "Video Recording", tool: "OBS Studio", icon: "record" },
    { title: "Thumbnail Design", tool: "Adobe Photoshop", icon: "image" },
  ] as const,
};

export const fortnite = {
  title: "Fortnite Creative",
  summary:
    "I built and published Fortnite games using Unreal Editor for Fortnite (UEFN). One of them reached about 100 concurrent players at its peak and generated revenue through Fortnite's creator ecosystem.",
  stats: [
    { value: "11", label: "Published Fortnite games" },
    { value: "~100", label: "Peak concurrent players on one game" },
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
    "Built a website that tracks Tesla Cybercab autonomous vehicles, including known Cybercabs, reported camera sightings, and user-submitted ride statistics.",
  contributions: [
    {
      title: "Website Development",
      body: "Developed the website using Claude Code, an AI coding assistant.",
      icon: "code",
    },
    {
      title: "Animated Assets",
      body: "Created animated video assets using Google Gemini.",
      icon: "film",
    },
    {
      title: "Ride Statistics",
      body: "Built functionality for users to submit and display Cybercab ride statistics.",
      icon: "chart",
    },
    {
      title: "Vehicle Tracking",
      body: "Developed pages for tracking known Cybercabs and reported sightings.",
      icon: "car",
    },
  ] as const,
  features: [
    { title: "Cybercab Vehicle Tracking", body: "A registry of known Cybercabs, each with its own record page.", accent: "marigold" },
    { title: "Reported Sightings", body: "Camera sightings reported by the community, collected in one place.", accent: "coral" },
    { title: "User-Submitted Ride Statistics", body: "Riders submit their trips; the site turns them into shared stats.", accent: "sky" },
    { title: "Interactive Website Experience", body: "Maps, animated counters, and pages built to be explored.", accent: "midnight" },
  ] as const,
  stack: ["Claude Code", "Google Gemini", "Cloudflare Workers", "Cloudflare D1", "Tailwind CSS", "MapLibre GL"],
  techNote:
    "The site is a static frontend served by a Cloudflare Worker, with a D1 database storing vehicles, sightings, and ride submissions. It was built through AI-assisted development with Claude Code — I drove what the site does and how it looks, working with Claude Code to write and refine the code rather than hand-writing every line.",
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
