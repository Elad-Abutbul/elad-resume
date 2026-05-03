import { QRCodeSVG } from "qrcode.react"

import type { PortfolioLink } from "@/data/portfolioLinks"

type PortfolioQrCodeProps = {
  className?: string
  link: PortfolioLink
  title?: string
}

export function PortfolioQrCode({
  className,
  link,
  title,
}: PortfolioQrCodeProps) {
  return (
    <QRCodeSVG
      bgColor="#ffffff"
      className={className}
      fgColor={`#${link.qrColor}`}
      level="M"
      marginSize={4}
      role={title ? "img" : undefined}
      size={420}
      title={title}
      value={link.href}
    />
  )
}
