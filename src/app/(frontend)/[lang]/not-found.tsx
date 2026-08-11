import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer, { type Sponsor as SponsorProp } from "@/components/layout/Footer";
import { getPayloadClient } from "@/lib/fetchFromCMS";
import dict from "./dictionaries/en.json";
import type { PayloadSponsor } from "@/types/cms";

export default async function NotFound() {
  const payload = await getPayloadClient();

  const sponsorsResult = await payload.find({
    collection: "sponsors",
    depth: 1,
  });

  const sponsorsData: SponsorProp[] = (sponsorsResult.docs as PayloadSponsor[]).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl: typeof doc.logo === "object" && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }));

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <Header lang="en" dict={dict} />

        <p className="font-visf-headline text-visf-accent text-7xl sm:text-8xl lg:text-[120px] font-medium leading-none">
          {dict.notFoundPage.eyebrow}
        </p>
        <h1 className="font-visf-headline font-medium leading-none text-black text-3xl sm:text-4xl lg:text-[56px] mt-4">
          {dict.notFoundPage.titleLine1}{" "}
          <span className="text-visf-accent">{dict.notFoundPage.titleAccent}</span>
        </h1>
        <p className="font-visf-text text-visf-gray text-sm sm:text-base max-w-md mt-4">
          {dict.notFoundPage.description}
        </p>
        <Link
          href="/en"
          className="font-visf-text text-sm font-medium text-black bg-visf-accent px-4 py-2 rounded-2xl mt-6 hover:underline"
        >
          {dict.notFoundPage.backHome}
        </Link>
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  );
}
