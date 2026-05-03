import {
  CvIcon,
  GitHubIcon,
  LinkedInIcon,
  type PortfolioIcon,
} from "@/components/icons/PortfolioIcons"

export type PortfolioLink = {
  id: "github" | "linkedin" | "cv"
  label: string
  href: string
  icon: PortfolioIcon
  accentRgb: string
  accentHex: string
  qrColor: string
}

export const portfolioLinks: PortfolioLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Elad-Abutbul",
    icon: GitHubIcon,
    accentRgb: "232 236 242",
    accentHex: "#e8ecf2",
    qrColor: "20252d",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/-elad-abutbul/",
    icon: LinkedInIcon,
    accentRgb: "47 157 255",
    accentHex: "#2f9dff",
    qrColor: "0A66C2",
  },
  {
    id: "cv",
    label: "CV",
    href: "https://drive.google.com/file/d/1ot3w41EOFIkyFES-_sNIveEl8JTB8tqW/view?usp=drive_link",
    icon: CvIcon,
    accentRgb: "235 181 69",
    accentHex: "#ebb545",
    qrColor: "B78221",
  },
]
