import React from "react";
import { NavLink } from "react-router-dom";

function NoData() {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center text-center">
      <div>
        <span className="text-gray-300">No pokemon here!</span>
        <img
          src={require("assets/img/pokeball-black.png")}
          className="w-24 mt-1 mb-6 opacity-10 mx-auto"
          alt="no-data"
        />
        <NavLink
          className="px-4 py-2 border border-cyan-500 rounded-md text-cyan-500"
          to="/"
        >
          Catch Pokemon
        </NavLink>
      </div>
    </div>
  );
}

export default NoData;