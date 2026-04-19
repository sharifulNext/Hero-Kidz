import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  subsets: ["latin"], 
  weight: ["100", "200", "400", "500", "600", "800"],
});

// Full Metadata Configuration
export const metadata = {
  title: {
    default: "Hero Kidz | Interactive Learning & Fun for Kids",
    template: "%s | Hero Kidz",
  },
  description: "Hero Kidz is a premier platform for children to explore, learn, and grow through engaging activities and educational content.",
  keywords: ["kids learning", "education", "hero kidz", "interactive activities"],
  authors: [{ name: "Hero Kidz Team" }],
  
  // OpenGraph (Facebook, LinkedIn sharing fix)
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
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar />
        </header>
  
        <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
          {children}
        </main>
        
        <footer className="md:w-11/12 mx-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}