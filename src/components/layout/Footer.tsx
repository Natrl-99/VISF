import { FaInstagram, FaVimeoV } from 'react-icons/fa'

export type Sponsor = {
  id: string
  name: string
  logoUrl: string | null
}

type FooterProps = {
  sponsors: Sponsor[]
}

export default function Footer({ sponsors }: FooterProps) {
  return (
    <footer className="font-visf-text px-6 py-8 bg-visf-accent">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs font-light mb-1">RULES</p>
          <p className="text-xs font-light mb-3">CONTACT US</p>
          <div className="flex gap-3 text-neutral-800">
            <FaInstagram size={16} />
            <FaVimeoV size={16} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 opacity-70">
          {sponsors.map((sp) =>
            sp.logoUrl ? (
              <img key={sp.id} src={sp.logoUrl} alt={sp.name} className="h-4 object-contain" />
            ) : (
              <span key={sp.id} className="text-[10px] font-semibold uppercase tracking-wide">
                {sp.name}
              </span>
            )
          )}
        </div>
      </div>
    </footer>
  )
}