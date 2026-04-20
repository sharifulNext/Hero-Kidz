import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "800"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Hero Kidz | Interactive Learning & Fun for Kids",
    template: "%s | Hero Kidz",
  },
  description: "Hero Kidz is a premier platform for children to explore, learn, and grow through engaging activities and educational content.",
  keywords: ["kids learning", "education", "hero kidz", "interactive activities"],
  authors: [{ name: "Hero Kidz Team" }],
  openGraph: {
    title: "Hero Kidz | Interactive Learning & Fun for Kids",
    description: "Empowering kids through play and education. Join Hero Kidz today!",
    url: "https://hero-kidz-blush.vercel.app/",
    siteName: "Hero Kidz",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://hero-kidz-blush.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* Provider must be INSIDE the body tag */}
        <NextAuthProvider>
          <header className="py-2 md:w-11/12 mx-auto">
            {/* Suspense is needed if Navbar uses useSession or searchParams */}
            <Suspense fallback={<div className="h-20" />}>
              <Navbar />
            </Suspense>
          </header>

          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
            {/* Critical: Suspense wraps children to handle client-side hooks in pages */}
            <Suspense fallback={<div className="flex justify-center items-center py-20 font-bold text-orange-500 animate-pulse">Loading...</div>}>
              {children}
            </Suspense>
          </main>

          <footer className="md:w-11/12 mx-auto">
            <Footer />
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}