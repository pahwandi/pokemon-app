import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_POKEMONS } from "data/query";
import { Context } from "data/store";

function PokemonList() {
  const [state, dispatch] = useContext(Context);
  const {myPokemons} = state.pokemonReducer;
  const [releaseStatus, setReleaseStatus] = useState(null);
  const [idSelected, setIdSelected] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [getMyPokemons, {loading, error, data}] = useLazyQuery(GET_MY_POKEMONS);

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if(!loading && !error && myPokemons.length > 0) {
        getMyPokemons({variables: { limit, offset }})
      }
    }
  }

  const getItem = (id) => {
    return pokemons.find(obj => obj.id === id)
  }

  const releasePokemon = () => {
    const newMyPokemons = myPokemons.filter(obj => obj.id !== idSelected)
    dispatch({
      type: 'UPDATE_MY_POKEMON',
      payload: newMyPokemons
    })
    setReleaseStatus(null)
  }

  const onCancel = () => {
    if(!releaseStatus) {
      setIdSelected(null)
    }
  }

  const onSelectedItem = (id) => {
    setReleaseStatus('alert')
    setIdSelected(id)
  }

  const onDataUpdate = () => {
    if(!loading && !error && !!data) {
      setPokemons([...pokemons, ...data.pokemons]);
      setOffset(offset + limit)
    }

    return () => { }
  }

  const onLoad = () => {
    const ids = myPokemons.map((el) => el.id);
    getMyPokemons({variables: { ids, limit, offset }})
  }

  useEffect(onCancel, [releaseStatus])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onDataUpdate, [loading, error, data])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onLoad, [])

  const Pulse = () => {
    let content = [];
    for (let i = 0; i < limit; i++) {
      content.push(<div key={i} className="animate-pulse card-pulse bg-slate-400">
        <div className="animate-pulse w-3/4 mx-auto aspect-square rounded-full bg-slate-300" />
        <div className="animate-pulse text-lg w-full h-5 my-2 bg-slate-300"></div>
      </div>);
    }
    return content;
  };

  return (
    <section className="pt-8 pb-4 px-4">
      <h2 className="text-xl lg:text-2xl pb-4">My Pokemons</h2>
      {myPokemons.length === 0 &&
        <h2 className="text-sm md:text-base w-full">Opps, don't have pokemon!</h2>
      }
      
      {myPokemons.length > 0 &&
        <React.Fragment>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!loading && myPokemons.map((pokemon, index) => 
            <div
              key={index}
              onClick={() => onSelectedItem(pokemon.id)}
              className={`card card-${getItem(pokemon.id)?.color.name}`}
            >
              <div className="card-content">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  className="w-1/2 mx-auto"
                  alt="pokemon"
                />
                <h3 className="capitalize text-base lg:text-xl pt-2">{getItem(pokemon.id)?.name}</h3>
                <h2 className="capitalize text-sm lg:text-base pb-1">( {pokemon.nickname} )</h2>
                <div>
                {getItem(pokemon.id)?.others[0].types.map((other, typeKey) => 
                  <span className="card-type text-gray-600 bg-slate-100/50" 
                  key={typeKey} >{other.type.name}</span>
                )}
                </div>
              </div>
            </div>
          )}

          {loading &&
            <Pulse />
          }
        </div>

        {!!releaseStatus &&
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
        }
        </React.Fragment>
      }
    </section>
  );
}

export default PokemonList;