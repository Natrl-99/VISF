//Media
export type MediaRef =
  | string
  | {
      id: string;
      url: string;
    };

//Jury Members
export interface PayloadJuryMember {
  id: string;
  name: string;
  bio: string;
  photo: MediaRef;
}

//Sponsors
export interface PayloadSponsor {
  id: string;
  name: string;
  logo: MediaRef;
  websiteUrl?: string;
  order: number;
  isActive: boolean;
}

//Introduction Text
export interface PayloadIntroduction {
  id: string;
  text: string;
}

//Date Event
export interface PayloadDateEvent {
  id: string;
  name: string;
  initialDate: string;
  endDate: string;
  city: string;
  country: string;
}

//Video Banner
export interface PayloadVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: MediaRef | null;
}

//Main Competition
export interface PayloadCompetition {
  id: string;
  name: string;
  isActive: boolean;
}

//Categories
export interface PayloadCategory {
  id: string;
  name: string;
  isActive: boolean;
}

// The "category" field is a "relationship" to the categories collection — depending on the query "depth", Payload returns it as just the ID (string) or as the fully resolved PayloadCategory document.
export type CategoryRef = string | PayloadCategory;

//Winners
export interface PayloadAward {
  id: string;
  category: CategoryRef;
  movieTitle: string;
  director: string;
  country: string;
}

export interface PayloadWinnersYear {
  id: string;
  year: number;
  isActive: boolean;
  awards: PayloadAward[];
}

//Online Sessions Line Up
export interface PayloadNextEdition {
  id: string;
  label: string;
  initialDate: string;
  endDate: string;
  isActive: boolean;
}
export interface PayloadOnlineSessionsIntro {
  id: string;
  label: string;
  text: string;
  isActive: boolean;
}
export interface PayloadOnlineSessionsMovie {
  id: string;
  title: string;
  director: string;
  country: string;
  duration: string;
  description: string;
}
export interface PayloadOnlineSessionsBlocks {
  id: string;
  name: string;
  intro: string;
  isActive: boolean;
  movies: PayloadOnlineSessionsMovie[];
}

//Online Screening Schedule
export interface PayloadOnlineScheduleIntro {
  id: string;
  label: string;
  text: string;
  isActive: boolean;
}
export interface PayloadOnlineScheduleMovie {
  id: string;
  title: string;
  director: string;
}
export interface PayloadOnlineScheduleBlock {
  id: string;
  name: string;
  title: string;
  isActive: boolean;
  movies: PayloadOnlineScheduleMovie[];
}
