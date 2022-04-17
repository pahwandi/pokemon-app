import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_DETAIL_POKEMON } from "data/query";
import { Context } from "data/store";
import { Icon } from "@iconify/react";
import base from "helpers/base";

function PokemonDetail() {
  const { id } = useParams(); 
  const [state, dispatch] = useContext(Context);
  const {myPokemons} = state.pokemonReducer;
  const [detail, setDetail] = useState({});
  const [tabActive, setTabActive] = useState(0);
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

  const Pulse = () => {
    return (
      <React.Fragment>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="animate-pulse card-pulse bg-slate-400">
            <div className="animate-pulse w-3/4 mx-auto aspect-square rounded-full bg-slate-300" />
            <div className="animate-pulse text-lg w-full h-5 my-2 bg-slate-300"></div>
          </div>
          <div className="pb-6">
            <div className="animate-pulse text-lg w-full h-5 my-4 bg-slate-300"></div>
            <div className="animate-pulse text-lg w-1/2 h-5 my-4 bg-slate-300"></div>
            <div className="animate-pulse text-lg w-3/4 h-5 my-4 bg-slate-300"></div>
            <div className="animate-pulse text-lg w-2/3 h-5 my-4 bg-slate-300"></div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <section className="px-4 pt-6 md:pt-8">
      {loading &&
        <Pulse />
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

            <div className="grid grid-cols-3 mt-2">
              <button
                className={`tab-detail ${tabActive === 0 ? 'active' : ''}`}
                onClick={() => setTabActive(0)}
              >
                Info
              </button>
              <button
                className={`tab-detail ${tabActive === 1 ? 'active' : ''}`}
                onClick={event => setTabActive(1)}
              >
                Stat
              </button>
              <button
                className={`tab-detail ${tabActive === 2 ? 'active' : ''}`}
                onClick={event => setTabActive(2)}
              >
                Moves
              </button>
            </div>
            <div className={`${tabActive === 0 ? 'block' : 'hidden'} py-2`}>
              <div className="text-sm md:text-base text-gray-600">
                <div className="flex flex-row">
                  <div className="w-32 py-1">Height</div>
                  <div className="w-full py-1 font-medium text-cyan-700">
                    {`${detail.height}' (${base.toCm(detail.height)} cm)`}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-32 py-1">Weight</div>
                  <div className="w-full py-1 font-medium text-cyan-700">
                    {`${detail.weight} lbs (${base.toKg(detail.weight)} kg)`}
                  </div>
                </div>

                <div className="text-sm md:text-base mt-2">
                  <h4 className="font-semibold text-cyan-700">Abilities</h4>
                  {detail.abilities.map((obj, key) => 
                    <div className="py-1.5 flex flex-row" key={key}>
                      <div className="text-cyan-700 text-3xl mr-1">
                        <Icon icon="ci:radio-filled" />
                      </div>
                      <div>
                        <p className="uppercase text-xs tracking-wide">{base.formatText(obj.ability.name)}</p>
                        <p>{obj.ability.descriptions[0].text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`${tabActive === 1 ? 'block' : 'hidden'} py-2`}>
              <table className="text-sm md:text-base text-gray-600">
                <tbody>
                {detail.stats.map((obj, key) => 
                  <tr
                    key={key}
                  >
                    <td className="whitespace-nowrap">
                      {base.formatText(obj.stat.name)}
                    </td>
                    <td className="w-full px-1 md:px-2">
                      <div className="w-full h-1 relative top-0.5 bg-slate-300" />
                      <div
                        className="h-1 relative bottom-0.5"
                        style={{
                          width: `${base.persenStat(obj.stat.base_stat[0].value, detail.stats)}%`,
                          backgroundColor: base.colorStat(obj.stat.base_stat[0].value)
                        }}
                      />
                    </td>
                    <td>
                      {obj.stat.base_stat[0].value}
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className={`${tabActive === 2 ? 'block' : 'hidden'} py-2`}>
              <ul>
              {detail.moves.map((obj, key) => 
                <li className="flex flex-row items-center py-1" key={key}>
                  <div className="text-cyan-700 text-2xl mr-2">
                    <Icon icon="fa-solid:running" />
                  </div>
                  <div>
                    <h4 className="capitalize tracking-wide text-sm md:text-base font-medium">{base.formatText(obj.move.name)}</h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      Accuracy <span className="font-semibold text-cyan-700">{obj.move.accuracy ? obj.move.accuracy : 'unknown'}</span>
                    </p>
                  </div>
                </li>
              )}
              </ul>
            </div>
          </div>  
        </div>
      }
      
      {!!catchStatus &&
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
      }
    </section>
  );
}

export default PokemonDetail;