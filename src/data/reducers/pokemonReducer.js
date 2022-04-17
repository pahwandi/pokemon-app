import storage from "helpers/storage";

const myPokemons = storage.get("myPokemons", []);
const initState = {
  pokemons: [],
  myPokemons: myPokemons.length > 0 ? myPokemons : []
}

const pokemonReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload
      };
    case "UPDATE_MY_POKEMON":
      storage.set('myPokemons', action.payload);
      return {
        ...state,
        myPokemons: action.payload
      }
    default: return state
  }
}

export default pokemonReducer


