/**
 * types/cms.ts
 *
 * Tipos escritos a mano que describen la forma real de los documentos que
 * regresa Payload para estas colecciones — alternativa temporal mientras
 * el bug de `payload generate:types` en Windows se resuelve (o hasta que
 * lo corramos desde WSL). Cuando el archivo autogenerado `payload-types.ts`
 * esté disponible, estos se pueden reemplazar por esos.
 */

// El campo "photo"/"logo" es tipo "upload" — según el "depth" de la
// consulta, Payload lo regresa como solo el ID (string) o como el
// documento completo de Media ya resuelto (objeto con url).
export type MediaRef =
  | string
  | {
      id: string
      url: string
      alt?: string
    }

export interface PayloadJuryMember {
  id: string
  name: string
  bio: string
  photo: MediaRef
  order: number
  isActive: boolean
}

export interface PayloadSponsor {
  id: string
  name: string
  logo: MediaRef
  websiteUrl?: string
  order: number
  isActive: boolean
}

export interface PayloadIntroduction {
  id: string
  text: string
}

export interface PayloadDateEvent {
  id: string
  name: string
  initialDate: string
  endDate: string
  city: string
  country: string
}

export interface PayloadVideo {
  id: string
  title: string
  url: string
  thumbnail: MediaRef | null
}
export interface PayloadCompetition {
  id: string
  name: string
  isActive: boolean
}

export interface PayloadCategory {
  id: string
  name: string
  isActive: boolean
}

// The "category" field is a "relationship" to the categories collection —
// depending on the query "depth", Payload returns it as just the ID
// (string) or as the fully resolved PayloadCategory document.
export type CategoryRef = string | PayloadCategory

export interface PayloadAward {
  id: string
  category: CategoryRef
  movieTitle: string
  director: string
  country: string
}

export interface PayloadWinnersYear {
  id: string
  year: number
  isActive: boolean
  awards: PayloadAward[]
}