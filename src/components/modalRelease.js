import React from "react";

function ModalRelease({
  setReleaseStatus,
  releasePokemon
}) {
  return (
    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 h-screen z-50 bg-cyan-900/70">
      <div className="bg-white rounded-md w-72 md:w-96 md p-4">
        <label>Are you sure to release this Pokemon ?</label>
        <div className="flex justify-end mt-2">
          <button
            className="rounded-md bg-white border-cyan-700 border mr-1 text-cyan-white text-sm md:text-base px-4 py-1.5"
            onClick={() => setReleaseStatus(null)}
          >
            No
          </button>
          <button
            className="rounded-md bg-cyan-700 text-white text-sm md:text-base px-4 py-1.5"
            onClick={() => releasePokemon()}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalRelease;