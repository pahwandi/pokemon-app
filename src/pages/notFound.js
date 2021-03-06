import React from "react";

function NotFound() {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center text-center">
      <div>
        <span className="text-gray-300">404 Not Found</span>
        <img
          src={require("assets/img/pokeball-black.png")}
          className="w-24 mt-1 mb-6 opacity-10 mx-auto"
          alt="no-data"
        />
      </div>
    </div>
  );
}

export default NotFound;