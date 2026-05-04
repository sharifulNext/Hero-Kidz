import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const categories = [
   { name: "Action Figures", img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=500", color: "bg-blue-500" },
  { name: "Soft Toys", img: "https://images.unsplash.com/photo-1559440666-30b809802081?q=80&w=500", color: "bg-pink-500" },
  { name: "Educational", img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=500", color: "bg-green-500" },
  { name: "Remote Control", img: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=500", color: "bg-yellow-500" },
  ];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-black text-center mb-10 text-slate-800">
        Browse by <span className="text-primary">Category</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {categories.map((cat, i) => (
          <Link key={i} href={`/category/${cat.name.toLowerCase()}`} className="group">
            <div className="relative h-40 md:h-52 rounded-3xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-all duration-300">
              <Image 
                src={cat.img} 
                alt={cat.name} 
                fill 
                className="object-cover group-hover:opacity-80" 
                sizes="(max-width: 768px) 50vw, 25vw" 
                priority={i < 4}
              />
              <div className={`absolute inset-0 opacity-40 ${cat.color}`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-lg md:text-xl text-center px-2 drop-shadow-md">
                  {cat.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;