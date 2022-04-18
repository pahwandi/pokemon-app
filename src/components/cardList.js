import React from "react";
import { NavLink } from "react-router-dom";

function CardList({
  to,
  data,
  onSelected,
  countPokemon
}) {
  return (
    <NavLink
      to={to}
      onClick={() => onSelected(data.id_mypokemon)}
      className={`card card-${data.color.name}`}
    >
      <div className={`card-content ${!!to ? 'pt-5' : ''}`}>
        {!!to &&
          <span className="card-type text-gray-600 bg-slate-100/50 absolute -left-2 -top-2">owned {countPokemon(data.id)}</span>
        }
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          className="w-1/2 mx-auto"
          alt="pokemon"
        />
        <h3 className="capitalize text-base lg:text-xl pt-2 pb-1">{data.name}</h3>
        <div>
        {data.others[0].types.map((other, typeKey) => 
          <span className="card-type text-gray-600 bg-slate-100/50" 
          key={typeKey} >{other.type.name}</span>
        )}
        </div>
      </div>
    </NavLink>
  );
}

export default CardList;