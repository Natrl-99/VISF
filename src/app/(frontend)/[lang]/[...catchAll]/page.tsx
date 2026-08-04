import { notFound } from "next/navigation";

// Named routes always win over this catch-all, so it only ever matches
// paths with no matching page.tsx. Next only renders not-found.tsx for an
// explicit notFound() throw, not for a bare routing miss, so this route
// exists purely to convert "no match" into that explicit call.
export default function CatchAll() {
  notFound();
}
