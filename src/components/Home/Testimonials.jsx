import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    { name: "Rahat Islam", role: "Parent", text: "Hero Kidz is amazing! The quality of the toys is top-notch and delivery was very fast.", rating: 5 },
    { name: "Anika Ahmed", role: "Parent", text: "My son loves the action figures. Safe materials and very durable toys. Highly recommended!", rating: 5 },
  ];

  return (
    <div className="py-10">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-14 text-slate-800">
        Happy <span className="text-primary">Families</span> ❤️
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-100 border-2 border-slate-50 relative group hover:border-primary transition-all duration-300">
            <FaQuoteLeft className="text-blue-100 absolute top-6 right-8" size={60} />
            <div className="flex gap-1 mb-4">
              {[...Array(rev.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-slate-600 font-medium italic mb-6 relative z-10">"{rev.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {rev.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{rev.name}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;