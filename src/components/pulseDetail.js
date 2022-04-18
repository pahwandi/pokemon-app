import React from "react";

function PulseDetail() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="animate-pulse card-pulse bg-slate-400">
        <div className="animate-pulse w-3/4 mx-auto aspect-square rounded-full bg-slate-300" />
        <div className="animate-pulse text-lg w-full h-5 my-2 bg-slate-300"></div>
      </div>
      <div className="pb-6">
        <div className="animate-pulse text-lg w-full h-5 my-4 bg-slate-300"></div>
        <div className="animate-pulse text-lg w-1/2 h-5 my-4 bg-slate-300"></div>
        <div className="animate-pulse text-lg w-3/4 h-5 my-4 bg-slate-300"></div>
        <div className="animate-pulse text-lg w-2/3 h-5 my-4 bg-slate-300"></div>
      </div>
    </div>
  );
}

export default PulseDetail;