import Banner from "@/components/Home/Banner";
import Product from "@/components/Home/Product";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Test from "@/components/test";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      {/* <Test/> */}
      {/* <p>{JSON.stringify(session)}</p> */}
        <section>
            <Banner/>
        </section>
        <section>
           <Product/>
        </section>
    </div>
  );
}





