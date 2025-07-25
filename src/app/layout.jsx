import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DayNightCricket - Latest Cricket Insights",
  description:
    "daynightcricket, Get updates on all matches, in-depth statistics, and insights. Your ultimate companion for all things cricket.",
  keywords:
    "daynightcricket, Cricket, latest score, cricket stats, insights, score, latest score, today match, match, live cricket.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://storage.googleapis.com/kreatewebsites-assets/daynightcricket/cricket-ball.webp"
        />
        <meta
          name="google-site-verification"
          content="khrgmF-ufh7LcASegdg_Rapna8FdVCHd_4XWF0aE3jI"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          {children}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
