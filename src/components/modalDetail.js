import React from "react";

function ModalDetail({
  catchStatus,
  setCatchStatus,
  haveNickname,
  setNickname,
  savePokemon
}) {
  return (
    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 h-screen z-50 bg-cyan-900/70">
      {(catchStatus === 'progress' || catchStatus === 'failed' || catchStatus === 'success') &&
        <div className="spinner">
          <img
            src={require(`assets/img/pokeball-${catchStatus === 'success' ? catchStatus : 'progress'}.png`)}
            className={`
              ${catchStatus === 'progress' ? 'animate-bounce' : ''}
              ${(catchStatus === 'failed' || catchStatus === 'success') ? 'animate-ping' : ''}
              w-12
              md:w-16
            `}
            alt="pokemon"
          />
        </div>
      }

      {catchStatus === 'naming' &&
        <div className="bg-white rounded-md w-72 md:w-96 md p-4">
          <label>Pokemon name</label>
          <input className={`input mt-1 ${haveNickname ? 'error' : ''}`} placeholder="Give name to the Pokemon" onKeyUp={el => setNickname(el.target.value) } />
          {haveNickname &&
            <span className="text-xs md:text-sm text-red-500">Nickname already used!</span>
          }
          <div className="flex justify-end mt-2">
            <button
              className="rounded-md bg-white border-cyan-700 border mr-1 text-cyan-white text-sm md:text-base px-6 py-1.5"
              onClick={() => setCatchStatus(null)}
            >
              Release
            </button>
            <button
              className="rounded-md bg-cyan-700 text-white text-sm md:text-base px-6 py-1.5"
              onClick={() => savePokemon()}
            >
              Save
            </button>
          </div>
        </div>
      }

      {catchStatus === 'finish' &&
        <div className="celebrate">
          <img
            src={require("assets/img/pokeball-finish.png")}
            className="animate-ping w-20 md:w-16"
            alt="pokemon"
          />
        </div>
      }
    </div>
  );
}

export default ModalDetail;