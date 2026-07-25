import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "it"] as const;
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const match = ranked.find((r) => (locales as readonly string[]).includes(r.lang));
  return match ? match.lang : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|admin|api|.*\\..*).*)"],
};
