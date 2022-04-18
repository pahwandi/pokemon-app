import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_DETAIL_POKEMON } from "data/query";
import { Context } from "data/store";
import base from "helpers/base";
import PulseDetail from "components/pulseDetail";
import TabDetail from "components/tabDetail";
import ModalDetail from "components/modalDetail";

function PokemonDetail() {
  const { id } = useParams(); 
  const [state, dispatch] = useContext(Context);
  const {myPokemons} = state.pokemonReducer;
  const [detail, setDetail] = useState({});
  const [catchStatus, setCatchStatus] = useState(null);
  const [haveNickname, setHaveNickname] = useState(false);
  const [nickname, setNickname] = useState('');
  const [getDetail, {loading, error, data}] = useLazyQuery(GET_DETAIL_POKEMON);

  const catchPokemon = () => {
    setCatchStatus('progress')
    setTimeout(() => {
      const rand = Math.random();
      if (rand < 0.5) {
        setCatchStatus('success')
        setTimeout(() => {
          setCatchStatus('naming')
        }, 1500)
      } else {
        setCatchStatus('failed')
        setTimeout(() => {
          setCatchStatus(null)
        }, 1500)
      }
    }, 3000)
  }

  const validateName = () => {
    const search = myPokemons.filter(obj => 
      obj.nickname.toLowerCase() === nickname.toLowerCase()
    )
    const isValid = search.length === 0
    if(!isValid) setHaveNickname(true)
    return isValid
  }

  const savePokemon = () => {
    if(!validateName()) return

    setCatchStatus('finish')
    const selected = {
      id_mypokemon: myPokemons.length,
      id: Number(id),
      nickname
    }

    dispatch({
      type: 'UPDATE_MY_POKEMON',
      payload: [...myPokemons, selected]
    })

    setTimeout(() => {
      setCatchStatus(null)
    }, 1500)
  }

  const onDataUpdate = () => {
    if(!loading && !error && !!data) {
      setDetail({
        ...data,
        ...data.pokemon[0],
        color: data.color[0].name,
        description: data.description[0].flavors[0].text
      })
    }

    return () => { }
  }

  const onLoad = () => {
    getDetail({variables: { id }})
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onDataUpdate, [loading, error, data])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onLoad, [])

  return (
    <section className="px-4 pt-6 md:pt-8">
      {loading &&
        <PulseDetail />
      }

      {!loading && Object.keys(detail).length > 0 &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <div className={`card-${detail.color} rounded-lg p-4`}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                className="w-3/4 mx-auto"
                alt="pokemon"
              />
            </div>
          </div>
          <div className="pb-6">
            <div className="flex flex-row">
              <div className="grow">
                <h2 className="capitalize tracking-wide text-lg lg:text-2xl font-medium">
                  {base.formatText(detail.name)}
                </h2>
                <div className="pt-0.5 pb-4">
                  {detail.types.map((other, typeKey) => 
                    <span className={`card-type card-${detail.color} text-gray-600`} key={typeKey}>{other.type.name}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center pb-4">
                <button
                  className="rounded-md bg-cyan-700 text-white px-6 py-1.5"
                  onClick={() => catchPokemon()}
                >
                  catch
                </button>
              </div>
            </div>
            <p className="text-sm">{detail.description}</p>

            <TabDetail data={detail} />
          </div>  
        </div>
      }
      
      {!!catchStatus &&
        <ModalDetail
          catchStatus={catchStatus}
          setCatchStatus={val => setCatchStatus(val)}
          haveNickname={haveNickname}
          setNickname={val => setNickname(val)}
          savePokemon={val => savePokemon(val)}
        />
      }
    </section>
  );
}

export default PokemonDetail;