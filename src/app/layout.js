import {Red_Hat_Display, Sarabun, Syne} from "next/font/google";
import "./globals.css";
import Navbarr from "@/app/_components/navbar";
import Footerr from "@/app/_components/footer";
import {NextUIProvider} from "@nextui-org/react";

const syne = Syne({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-syne"
});

const redHat = Red_Hat_Display({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
    variable: "--font-redhat"
});

const sarabun = Sarabun({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700"],
    style: ["normal", "italic"],
    variable: "--font-sara"
})

export const metadata = {
    title: "EasyMeet",
    description: ":3",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body id="body" className={`dark ${syne.variable} ${redHat.variable} ${sarabun.variable}`}>
                <NextUIProvider>
                    <Navbarr />
                    {children}
                    <Footerr/>
                </NextUIProvider>
            </body>
        </html>
    );
}