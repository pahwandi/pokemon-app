import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_POKEMONS } from "data/query";
import { Context } from "data/store";
import PulseList from "components/pulseList";
import CardList from "components/cardList";

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

  return (
    <section className="pt-8 pb-4 px-4">
      <h2 className="text-xl lg:text-2xl pb-4">Pokemons</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => 
          <CardList
            key={index}
            data={pokemon}
            countPokemon={val => countPokemon(val)}
            to={`/pokemon-detail/${pokemon.id}`}
            onSelected={() => {}}
          />
        )}

        {loading &&
          <PulseList item={limit} />
        }
      </div>
    </section>
  );
}

export default PokemonList;