import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import Hero from '@/components/homepage/Hero'
import IntroSection from '@/components/homepage/IntroSection'
import OfficialSelectionOnlineSessions from '@/components/homepage/OfficialSelectionOnlineSessions'
import VideoBanner from '@/components/homepage/VideoBanner'
import JurySection, { type JuryMember as JuryMemberProp } from '@/components/homepage/JurySection'
import CompetitionsSection from '@/components/homepage/CompetitionsSection'
import { getPayloadClient } from '@/lib/fetchFromCMS'
// Tipos escritos a mano — alternativa temporal mientras se resuelve el
// bug de `payload generate:types` en Windows (ver types/cms.ts para más
// contexto). Cuando el archivo autogenerado esté disponible, se reemplaza
// este import por el de "@/payload-types".
import type { PayloadJuryMember, PayloadSponsor, PayloadIntroduction } from '@/types/cms'

// ---------------------------------------------------------------------------
// Datos que TODAVÍA son de prueba — Hero y VideoBanner los conectamos
// después, cuando convirtamos esos globals a TypeScript.
// ---------------------------------------------------------------------------
const heroData = {
  imageUrl: '/banner.png',
}

const videoBannerData = {
  headline: 'SUBMIT YOUR FILM NOW',
  posterUrl: 'https://picsum.photos/seed/visf-video/1600/700?grayscale',
  videoUrl: null as string | null,
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  // --- Jurado real, solo los activos, ordenados ---
  const juryResult = await payload.find({
    collection: 'jury-members',
    where: { isActive: { equals: true } },
    sort: 'order',
    depth: 1, // para que "photo" venga con la URL ya resuelta, no solo el ID
  })

  const juryData: JuryMemberProp[] = (juryResult.docs as PayloadJuryMember[]).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    bio: doc.bio,
    photoUrl: typeof doc.photo === 'object' && doc.photo?.url ? doc.photo.url : '',
  }))

  // --- Patrocinadores reales, solo los activos, ordenados ---
  const sponsorsResult = await payload.find({
    collection: 'sponsors',
    where: { isActive: { equals: true } },
    sort: 'order',
    depth: 1,
  })

  const sponsorsData: SponsorProp[] = (sponsorsResult.docs as PayloadSponsor[]).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl: typeof doc.logo === 'object' && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }))

  // --- Texto de introducción ---
  const introductionResult = await payload.find({
    collection: 'introduction',
    limit: 1,
  })

  const introText =
    (introductionResult.docs[0] as PayloadIntroduction | undefined)?.text ?? ''

  return (
    <main className="bg-white">
      <section className="relative bg-neutral-950 text-white">
        <Header />
        <Hero imageUrl={heroData.imageUrl} />

        <div className="relative pb-10 px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {sponsorsData.map((sp) =>
            sp.logoUrl ? (
              <img
                key={sp.id}
                src={sp.logoUrl}
                alt={sp.name}
                width={400}
                height={400}
                className="h-6 w-6 object-contain opacity-70 grayscale invert"
              />
            ) : (
              <span
                key={sp.id}
                className="text-neutral-400 text-[11px] font-semibold tracking-wide uppercase"
              >
                {sp.name}
              </span>
            ),
          )}
        </div>
      </section>

      <IntroSection
        imageUrl="https://picsum.photos/seed/visf-toast/900/700?grayscale"
        dateLabel="12-17 MAY, 2027"
        locationLabel="VERONA, ITALY"
        introText={introText}
      />

      <OfficialSelectionOnlineSessions
        officialSelectionImageUrl="https://picsum.photos/seed/visf-camera/900/900?grayscale"
        onlineSessionsImageUrl="https://picsum.photos/seed/visf-audience/900/900?grayscale"
      />

      <VideoBanner
        headline={videoBannerData.headline}
        posterUrl={videoBannerData.posterUrl}
        videoUrl={videoBannerData.videoUrl}
      />

      <JurySection members={juryData} />

      <CompetitionsSection imageUrl="https://picsum.photos/seed/visf-speaker/900/900?grayscale" />

      <Footer sponsors={sponsorsData} />
    </main>
  )
}