import type { CSSProperties, MouseEvent } from "react"
import { useEffect, useId, useRef } from "react"

import { PortfolioQrCode } from "@/components/PortfolioQrCode/PortfolioQrCode"
import type { PortfolioLink } from "@/data/portfolioLinks"

type PortfolioQrModalProps = {
  link: PortfolioLink | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PortfolioQrModal({
  link,
  open,
  onOpenChange,
}: PortfolioQrModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false)
      }
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onOpenChange, open])

  if (!link || !open) {
    return null
  }

  const Icon = link.icon

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onOpenChange(false)
    }
  }

  return (
    <div className="qr-dialog-overlay" onMouseDown={handleOverlayMouseDown}>
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="qr-dialog qr-dialog-content"
        role="dialog"
        style={
          {
            "--card-accent": link.accentHex,
            "--card-accent-rgb": link.accentRgb,
          } as CSSProperties
        }
      >
        <div className="qr-dialog__header">
          <div className="qr-dialog__brand-icon" aria-hidden="true">
            <Icon strokeWidth={2.7} />
          </div>

          <h2 className="qr-dialog__title" id={titleId}>
            {link.label}
          </h2>

          <button
            aria-label={`Close ${link.label} QR code`}
            className="qr-dialog__close"
            onClick={() => onOpenChange(false)}
            ref={closeButtonRef}
            type="button"
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6 6 18M6 6l12 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.2"
              />
            </svg>
          </button>
        </div>

        <div className="qr-dialog__frame">
          <PortfolioQrCode
            className="qr-dialog__code"
            link={link}
            title={`${link.label} QR code`}
          />
        </div>
      </section>
    </div>
  )
}
