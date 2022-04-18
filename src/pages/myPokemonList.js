import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_POKEMONS } from "data/query";
import { Context } from "data/store";
import NoData from "components/noData";
import PulseList from "components/pulseList";
import CardList from "components/cardList";
import ModalRelease from "components/modalRelease";

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
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight - 10) {
      if(!loading && !error && myPokemons.length > 0) {
        getMyPokemons({variables: { limit, offset }})
      }
    }
  }

  const getItem = (id) => {
    return pokemons.find(obj => obj.id === id)
  }

  const releasePokemon = () => {
    const newMyPokemons = myPokemons.filter(obj => obj.id_mypokemon !== idSelected)
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
    setTimeout(() => {
      setReleaseStatus('alert')
      setIdSelected(id)
    }, 250);
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

  return (
    <section className="pt-8 pb-4 px-4">
      <h2 className="text-xl lg:text-2xl pb-4">My Pokemons</h2>
      {myPokemons.length === 0 &&
        <NoData />
      }
      
      {myPokemons.length > 0 && pokemons.length > 0 &&
        <React.Fragment>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!loading && myPokemons.map((pokemon, index) => 
            <CardList
              to={''}
              key={index}
              data={{...getItem(pokemon.id), nickname: pokemon.nickname }}
              countPokemon={() => {}}
              onSelected={val => onSelectedItem(val)}
            />
          )}

          {loading &&
            <PulseList item={limit} />
          }
        </div>

        {!!releaseStatus &&
          <ModalRelease 
            setReleaseStatus={val => setReleaseStatus(val)}
            releasePokemon={val => releasePokemon(val)}
          />
        }
        </React.Fragment>
      }
    </section>
  );
}

export default PokemonList;