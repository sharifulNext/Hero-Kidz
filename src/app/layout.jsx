import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});
export const metadata = {
  title:{
      default:"Hero Kidz",
      template:"%s | Hero Kidz"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}>
          <header className="py-2 md:w-11/12 mx-auto">
             <Navbar/>
          </header>
          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
               {children}
          </main>
        
        <footer>
           <Footer/>
        </footer>
      </body>
    </html>
  );
}
