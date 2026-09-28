import { Gloock, Hanken_Grotesk } from "next/font/google";

export const display = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});
