import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_POKEMONS } from "data/query";
import { Context } from "data/store";

function PokemonList() {
  const [state, dispatch] = useContext(Context);
  const {pokemons, myPokemons} = state.pokemonReducer;
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [getPokemons, {loading, error, data}] = useLazyQuery(GET_POKEMONS);

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10) {
      if(!loading && !error && pokemons.length > 0) {
        getPokemons({variables: { limit, offset }})
      }
    }
  }

  const countPokemon = (id) => {
    const search = myPokemons.filter(obj => obj.id === id)
    return search.length
  }

  const onDataUpdate = () => {
    if(!loading && !error && !!data) {
      dispatch({
        type: 'GET_POKEMONS',
        payload: [...pokemons, ...data.pokemons]
      })
      setOffset(offset + limit)
    }

    return () => { }
  }

  const onLoad = () => {
    getPokemons({variables: { limit, offset }})
  }

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
      <h2 className="text-xl lg:text-2xl pb-4">Pokemons</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => 
          <NavLink
            key={index}
            to={`/pokemon-detail/${pokemon.id}`}
            className={`card card-${pokemon.color.name}`}
          >
            <div className="card-content pt-5">
              <span className="card-type text-gray-600 bg-slate-100/50 absolute -left-2 -top-2">owned {countPokemon(pokemon.id)}</span>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                className="w-1/2 mx-auto"
                alt="pokemon"
              />
              <h3 className="capitalize text-base lg:text-xl pt-2 pb-1">{pokemon.name}</h3>
              <div>
              {pokemon.others[0].types.map((other, typeKey) => 
                <span className="card-type text-gray-600 bg-slate-100/50" 
                key={typeKey} >{other.type.name}</span>
              )}
              </div>
            </div>
          </NavLink>
        )}

        {loading &&
          <Pulse />
        }
      </div>
    </section>
  );
}

export default PokemonList;