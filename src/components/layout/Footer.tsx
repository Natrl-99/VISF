import { FaInstagram, FaVimeoV } from "react-icons/fa";
import type { Dictionary } from "@/app/(frontend)/[lang]/dictionaries";

export type Sponsor = {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl?: string;
};

type FooterProps = {
  sponsors: Sponsor[];
  dict: Dictionary;
};

function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function Footer({ sponsors, dict }: FooterProps) {
  return (
    <footer className="font-visf-text px-4 sm:px-6 lg:px-[38px] py-8 bg-visf-accent">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-[16px] leading-[14px] font-light mb-1">{dict.footer.rules}</p>
          <p className="text-[16px] leading-[14px] font-light mb-3">{dict.footer.contactUs}</p>
          <div className="flex gap-3 text-neutral-800">
            <a
              href="https://www.instagram.com/visfverona?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <FaVimeoV size={20} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 opacity-70">
          {sponsors.map((sp) =>
            sp.logoUrl ? (
              <a
                key={sp.id}
                href={sp.websiteUrl ? withProtocol(sp.websiteUrl) : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  key={sp.id}
                  src={sp.logoUrl}
                  alt={sp.name}
                  className="h-4 object-contain"
                />
              </a>
            ) : (
              <span
                key={sp.id}
                className="text-[10px] font-semibold uppercase tracking-wide"
              >
                {sp.name}
              </span>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
