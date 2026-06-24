export interface ChapterDetails {
  date?: string;
  time?: string;
  venue?: string;
  startingLocation?: string;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  quote: string;
  image: string;
  details?: ChapterDetails;
}

import haldi from "@/assets/Haldi.jpg";
import mehendi from "@/assets/Mehandii.jpg";
import sangeet from "@/assets/sangeet.jpg";
import barajatri from "@/assets/Barrat.jpg";
import wedding from "@/assets/wedding.jpg";
import hastaganthi from "@/assets/Hasthaganthi.jpg";
import reception from "@/assets/reception.jpg";
import couple from "@/assets/couple.jpg";

export const WEDDING_DATE = new Date("2026-07-12T18:00:00");
export const WEDDING_VENUE = "Amo Basha bhavan,Nuasahi,Blliguda, Odisha";

export const chapters: Chapter[] = [
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "Swagatam",
    quote:
      "With the blessings of Lord Jagannath and our beloved families, we invite you to celebrate our special day.",
    image: couple,
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    subtitle: "Mangala Snana",
    quote: "Bathed in turmeric and blessings, we begin the sacred journey of togetherness.",
    image: haldi,
    details: {
      date: "Sunday, 12 July 2026",
      time: "10:00 AM onwards",
      venue: "Amo Basha bhavan,Nuasahi,Blliguda, Odisha",
    },
  },
  {
    id: "mehendi",
    title: "Mehendi Ceremony",
    subtitle: "Mehendi Sandhya",
    quote: "As the henna deepens in color, so does the joy in our hearts.",
    image: mehendi,
    details: {
      date: "Sunday, 12 july 2026",
      time: "10:30 PM onwards",
      venue: "Amo Basha bhavan,Nuasahi,Blliguda",
    },
  },
  {
    id: "sangeet",
    title: "Melodies of Love",
    subtitle: "Sangeeta ",
    quote: "A beautiful melody of mornings, laughter, and unforgettable memories.",
    image: sangeet,
    details: {
      date: "Sunday, 12 July 2026",
      time: "11:00 PM onwards",
      venue: "Amo Basha bhavan,Nuasahi,Blliguda",
    },
  },
  {
    id: "barajatri",
    title: "Barajatri",
    subtitle: "The Groom's Procession",
    quote: "With joy in our hearts and blessings from our elders, the groom's procession begins.",
    image: barajatri,
    details: {
      date: "Sunday, 12 july 2026",
      time: "4:00 PM",
      startingLocation: "Amo Basha bhavan,Nuasahi,Blliguda",
    },
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    subtitle: "Bibaha Bedi",
    quote: "Two souls, two families, one beautiful beginning under divine blessings.",
    image: wedding,
    details: {
      date: "Sunday, 12 July 2026",
      time: "6:30 PM (Lagna Muhurta)",
      venue: "Amo Basha bhavan,Nuasahi,Blliguda",
    },
  },
  {
    id: "hastaganthi",
    title: "Hasta Ganthi",
    subtitle: "The Sacred Knot",
    quote: "Bound together by sacred knots and eternal promises, we begin our journey as one.",
    image: hastaganthi,
    details: {
      date: "Sunday, 12 July 2026",
      time: "9:00 PM",
      venue: "Amo Basha bhavan,Nuasahi,Blliguda",
    },
  },
  {
    id: "reception",
    title: "Reception",
    subtitle: "Bahuragamana",
    quote: "Join us as we celebrate family, happiness, and a new beginning.",
    image: reception,
    details: {
      date: "Monday, 13 July 2026",
      time: "12:30 PM onwards",
      venue: "Maa Patakhanda Kalyani Mandap, Balliguda, Odisha 762103",
    },
  },
  {
    id: "gallery",
    title: "Gallery",
    subtitle: "Smruti",
    quote: "Capturing precious moments that will be cherished forever.",
    image: couple,
  },
  {
    id: "venue",
    title: "Venue",
    subtitle: "Sthaana",
    quote: "We look forward to welcoming you to celebrate this joyous occasion.",
    image: wedding,
  },
  {
    id: "blessings",
    title: "Blessings",
    subtitle: "Aashirvada",
    quote: "Your blessings and good wishes are the greatest gifts to our new journey.",
    image: hastaganthi,
  },
];
