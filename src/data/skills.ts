/** Skills exactly as listed on the resume. Add or remove items freely. */

export type SkillIcon = "palette" | "gamepad" | "code" | "box" | "sparkles" | "video";
export type SkillTone = "white" | "marigold" | "sky" | "midnight" | "coral" | "peach";

export type SkillGroup = {
  id: string;
  title: string;
  icon: SkillIcon;
  tone: SkillTone;
  items: string[];
  /** Optional app logo (path under /public). Replaces the icon when set. */
  logo?: string;
  /** Sit the logo on a white tile — for logos without their own background. */
  logoOnTile?: boolean;
};

export const skills: SkillGroup[] = [
  {
    id: "adobe",
    title: "Adobe Creative Suite",
    icon: "palette",
    tone: "white",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro"],
    logo: "/images/skills/photoshop.webp",
  },
  {
    id: "gamedev",
    title: "Game Development",
    icon: "gamepad",
    tone: "marigold",
    items: ["Unreal Engine", "Unreal Editor for Fortnite (UEFN)"],
    logo: "/images/skills/uefn.webp",
  },
  {
    id: "3d",
    title: "3D Design",
    icon: "box",
    tone: "sky",
    items: ["Blender"],
    logo: "/images/skills/blender.webp",
    logoOnTile: true,
  },
  {
    id: "ai",
    title: "AI Tools",
    icon: "sparkles",
    tone: "midnight",
    items: ["Claude Code", "ChatGPT"],
    logo: "/images/skills/chatgpt.svg",
  },
];
