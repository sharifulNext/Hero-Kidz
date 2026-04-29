import Banner from "@/components/Home/Banner";
import Product from "@/components/Home/Product";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-20">
        <section>
            <Banner/>
        </section>
        <section>
           <Product/>
        </section>
    </div>
  );
}





