# Frontend Constitution

Standing rules for frontend work on VISF. These override default habits — follow them even when a shortcut looks faster.

## Stack & structure

- Next.js 16 App Router (a customized fork — see `AGENTS.md`, read `node_modules/next/dist/docs/` before using any `next/*` API you haven't verified in this version), TypeScript, Tailwind v4 (config lives as an `@theme` block in `src/app/globals.css`, there is no `tailwind.config.js`), Payload CMS for content.
- Route groups: `src/app/(frontend)` is the public site, `src/app/(payload)` is the CMS admin — don't cross-import between them.
- Components are organized by role, not by page: `src/components/layout/` for chrome shared across the whole site (Header, Footer), `src/components/ui/` for small reusable atoms (buttons, etc.), `src/components/homepage/` for sections specific to one page. Put new components in the folder matching their actual reuse scope, not where it's convenient to add them.
- `src/types/cms.ts` holds hand-written types as a temporary stand-in for `payload generate:types`, which is broken on Windows. Don't "fix" this by importing from `@/payload-types` until that's resolved — check the comment in `page.tsx` before touching CMS types.

## Language

- All code, identifiers, comments, and user-facing strings (`aria-label`, `alt`, `title`, UI copy) are written in **English**, regardless of what language the conversation happens in.
- This is a rule for new code. Some existing files (e.g. `page.tsx`) have pre-existing Spanish comments — leave them as-is unless you're already editing that exact line for another reason; don't do drive-by translation.

## Comments

- Default to no comments. Code should read clearly from naming and structure alone.
- Write a comment only when it captures a **non-obvious why**: a hidden constraint, a workaround for a specific bug, a decision that would look wrong or arbitrary without context. If removing the comment wouldn't confuse the next reader, don't write it.
- Never write a comment that just restates what the code does, or that narrates the current task/fix ("added for X feature", "fixes bug #123") — that belongs in the commit message or PR description, not the file.
- Good existing examples to match the spirit of (once translated to English for new code): the notes in `page.tsx` explaining *why* the CMS types are hand-written (Windows bug in `generate:types`) and *why* some homepage data is still hardcoded (not yet wired to a CMS global). Both explain a non-obvious constraint, not what the surrounding code visibly already does.

## Design tokens, not literals

- `Neue Haas Grotesk Display Pro` and `Stack Sans` are paid fonts not yet licensed for web use (see the note at the top of `src/app/globals.css`). Never hardcode `font-family: 'Neue Haas Grotesk Display Pro'` from a Figma spec — use the `--font-visf-headline` / `--font-visf-text` tokens (Tailwind: `font-visf-headline`, `font-visf-text`), which already carry the Helvetica Neue fallback. When the real font gets licensed, it's a one-line change in `globals.css` instead of a repo-wide find-and-replace.
- Colors, radii, and other repeated design values belong in the `@theme` block in `globals.css` as `--color-visf-*` / `--radius-visf-*` tokens, not as one-off hex codes (`bg-[#bad4ee]`) in component classes.

## Responsiveness: translating Figma specs

- Figma's exported CSS (`position: absolute; left: Npx; top: Npx;`) is a snapshot of one fixed-width frame — Figma is a canvas tool, it doesn't know about reflow. Copying those coordinates literally into a component only looks right at the exact viewport width the frame was measured at; at any other width the element overflows or floats in blank space.
- Extract only the *shape* from a Figma spec (widths, heights, font-size, line-height, colors) and discard the `left`/`top` coordinates. Rebuild placement with Tailwind flex/grid utilities (`justify-between`, `items-center`, absolute-centering against a positioned ancestor, etc.) so it reflows correctly at any width.
- Apply the literal spec values at the breakpoint the frame was actually measured from (usually desktop, `lg:`), and scale proportionally down for smaller breakpoints when no separate mobile/tablet frame was provided — don't wait for a pixel-perfect mobile mockup to ship a responsive first pass.
- Tailwind is mobile-first: a class with **no** breakpoint prefix applies at every width, including the smallest. A Figma pixel value copied straight onto a bare class (`text-[20px]`, `w-full`, `h-[240px]`) therefore ships to mobile too, not just desktop — that's a responsiveness bug even if it looks fine at `lg:`. Every literal value pulled from a desktop frame must be gated behind its breakpoint prefix (`lg:text-[20px]`), with an explicit, smaller, proportional value (or a sane default like `text-sm`) at the base/`sm:` tier. Before calling a Figma-to-code pass done, check every arbitrary-value class you wrote for a missing prefix.
- Image assets go in `/public/` at the project root, matching the existing naming convention (`LOGO-VISF-BLACK.png`, `ICON-VISF-BLACK.png`, etc.) — no subfolders unless told otherwise.

## Reusability

- Before writing a new component, check `src/components/*` for something that already does the job (e.g. `SubmitFilmButton` is the single source of truth for the FilmFreeway link — reuse it, don't recreate an `<a>` tag with the same href).
- Don't extract an abstraction until a third real use case shows up. Two similar call sites can stay duplicated; a third is the signal to factor out a shared component or hook.
- If the user says a component or piece of styling is "ready" or "done," don't restyle or refactor it as a side effect of a nearby change — touch only what was asked.
- When asked to explain a feature before implementing, treat that literally: no code until the user confirms the plan.