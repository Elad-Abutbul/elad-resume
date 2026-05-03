import { useCallback, useState } from "react"

import { PortfolioLinkCard } from "@/components/PortfolioLinkCard/PortfolioLinkCard"
import { PortfolioQrCode } from "@/components/PortfolioQrCode/PortfolioQrCode"
import { PortfolioQrModal } from "@/components/PortfolioQrModal/PortfolioQrModal"
import { portfolioLinks, type PortfolioLink } from "@/data/portfolioLinks"

function openExternalLink(href: string) {
  window.open(href, "_blank", "noopener,noreferrer")
}

function PortfolioQrPreloader({ links }: { links: PortfolioLink[] }) {
  return (
    <div className="qr-preloader" aria-hidden="true">
      {links.map((link) => (
        <PortfolioQrCode
          key={link.id}
          className="qr-preloader__code"
          link={link}
        />
      ))}
    </div>
  )
}

export function PortfolioShowcase() {
  const [activeQrLink, setActiveQrLink] = useState<PortfolioLink | null>(null)

  const handleOpenLink = useCallback((href: string) => {
    openExternalLink(href)
  }, [])

  const handleOpenQr = useCallback((link: PortfolioLink) => {
    setActiveQrLink(link)
  }, [])

  const handleModalOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setActiveQrLink(null)
    }
  }, [])

  return (
    <main className="portfolio-page">
      <section className="portfolio-shell" aria-labelledby="portfolio-title">
        <header className="portfolio-hero">
          <h1 id="portfolio-title">Elad Abutbul</h1>
          <p>Software Developer</p>
        </header>

        <div className="portfolio-grid" aria-label="Portfolio links">
          {portfolioLinks.map((link) => (
            <PortfolioLinkCard
              key={link.id}
              link={link}
              onOpen={handleOpenLink}
              onOpenQr={handleOpenQr}
            />
          ))}
        </div>
      </section>

      <PortfolioQrModal
        link={activeQrLink}
        open={activeQrLink !== null}
        onOpenChange={handleModalOpenChange}
      />

      <PortfolioQrPreloader links={portfolioLinks} />
    </main>
  )
}
