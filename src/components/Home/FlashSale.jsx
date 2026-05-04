import { FaBolt } from "react-icons/fa";

const FlashSale = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-200">
      <div className="space-y-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full font-black text-sm uppercase animate-pulse">
          <FaBolt /> Flash Sale
        </div>
        <h2 className="text-4xl md:text-6xl font-black leading-tight">
          Grab Your Toy <br /> Up to <span className="text-yellow-400">50% Off!</span>
        </h2>
        <p className="text-blue-100 font-medium max-w-md">
          Only for today! Get the best deals on your favorite Hero Kidz toys.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
        <p className="font-bold uppercase tracking-widest text-xs">Ends In:</p>
        <div className="flex gap-4">
          {["12", "45", "08"].map((time, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="bg-white text-primary w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl text-2xl font-black shadow-lg">
                {time}
              </span>
              <span className="text-[10px] mt-2 font-bold uppercase">{i === 0 ? "Hrs" : i === 1 ? "Min" : "Sec"}</span>
            </div>
          ))}
        </div>
        <button className="btn bg-yellow-400 hover:bg-yellow-500 border-none text-slate-900 btn-lg w-full mt-4 rounded-2xl font-black">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default FlashSale;