import { Montserrat, Lato } from "next/font/google";

export const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const lato = Lato({
    subsets: ["latin"],
    weight: "100"
});
