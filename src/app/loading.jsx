import Logo from "@/components/layouts/Logo";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-slate-50/50">

      <div className="relative flex items-center justify-center mb-8">
        
        <div className="absolute h-24 w-24 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
        
        {/* Logo with a smooth breathing effect */}
        <div className="animate-bounce duration-2000 ease-in-out">
          <Logo />
        </div>
      </div>

      {/* Modern Text Loading Indicator */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold tracking-widest uppercase text-slate-700 animate-pulse">
          Loading
        </h2>
        
        {/* Progress Bar Style (Optional but looks cool) */}
        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-full origin-left animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;