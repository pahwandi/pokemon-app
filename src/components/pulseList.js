import React from "react";

function PulseList({ item }) {
  let List = [];
  for (let i = 0; i < item; i++) {
    List.push(
      <div key={i} className="animate-pulse card-pulse bg-slate-400">
        <div className="animate-pulse w-3/4 mx-auto aspect-square rounded-full bg-slate-300" />
        <div className="animate-pulse text-lg w-full h-5 my-2 bg-slate-300"></div>
      </div>
    );
  }
  return List;
}

export default PulseList;