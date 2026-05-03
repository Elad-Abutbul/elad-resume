import type { CSSProperties, KeyboardEvent, MouseEvent } from "react"
import ExternalLink from "lucide-react/dist/esm/icons/external-link.mjs"
import QrCode from "lucide-react/dist/esm/icons/qr-code.mjs"

import type { PortfolioLink } from "@/data/portfolioLinks"

type PortfolioLinkCardProps = {
  link: PortfolioLink
  onOpen: (href: string) => void
  onOpenQr: (link: PortfolioLink) => void
}

type PortfolioCardStyle = CSSProperties & {
  "--card-accent": string
  "--card-accent-rgb": string
}

export function PortfolioLinkCard({
  link,
  onOpen,
  onOpenQr,
}: PortfolioLinkCardProps) {
  const Icon = link.icon

  const cardStyle: PortfolioCardStyle = {
    "--card-accent": link.accentHex,
    "--card-accent-rgb": link.accentRgb,
  }

  const handleCardClick = () => {
    onOpen(link.href)
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onOpen(link.href)
    }
  }

  const handleOpenClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onOpen(link.href)
  }

  const handleQrClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onOpenQr(link)
  }

  return (
    <article
      aria-label={`Open ${link.label}`}
      className="portfolio-card"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      style={cardStyle}
      tabIndex={0}
    >
      <div className="portfolio-card__content">
        <div className="portfolio-card__icon" aria-hidden="true">
          <Icon strokeWidth={2.7} />
        </div>

        <Icon
          aria-hidden="true"
          className="portfolio-card__watermark"
          strokeWidth={1.65}
        />

        <div className="portfolio-card__footer">
          <h2>{link.label}</h2>

          <div className="portfolio-card__actions">
            <button
              aria-label={`Open ${link.label}`}
              className="portfolio-card__action"
              onClick={handleOpenClick}
              type="button"
            >
              <ExternalLink aria-hidden="true" strokeWidth={2.5} />
              <span>Open</span>
            </button>

            <button
              aria-label={`Show ${link.label} QR code`}
              className="portfolio-card__action"
              onClick={handleQrClick}
              type="button"
            >
              <QrCode aria-hidden="true" strokeWidth={2.5} />
              <span>QR</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
