import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query samplePokeAPIquery($limit: Int, $offset: Int) {
    pokemons: pokemon_v2_pokemonspecies(limit: $limit, offset: $offset, order_by: {name: asc}) {
      name
      id
      color: pokemon_v2_pokemoncolor {
        name
      }
      others: pokemon_v2_pokemons(limit: 1) {
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

export const GET_DETAIL_POKEMON = gql`
  query samplePokeAPIquery($id: Int) {
    color: pokemon_v2_pokemoncolor(where: {pokemon_v2_pokemonspecies: {id: {_eq: $id}}}) {
      name
    }
    pokemon: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
      name
      height
      weight
    }
    description: pokemon_v2_pokemonspecies(where: {id: {_eq: $id}}) {
      flavors: pokemon_v2_pokemonspeciesflavortexts(distinct_on: version_id, where: {language_id: {_eq: 9}}, limit: 2) {
        text: flavor_text
      }
    }
    moves: pokemon_v2_pokemonmove(where: {pokemon_id: {_eq: $id}}, distinct_on: move_id, limit: 10) {
      move: pokemon_v2_move {
        name
        accuracy
      }
    }
    types: pokemon_v2_pokemontype(where: {pokemon_id: {_eq: $id}}) {
      type: pokemon_v2_type {
        name
      }
    }
    abilities: pokemon_v2_pokemonability(where: {pokemon_id: {_eq: $id}}) {
      ability: pokemon_v2_ability {
        name
        descriptions: pokemon_v2_abilityflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
          text: flavor_text
        }
      }
    }
    stats: pokemon_v2_pokemonstat(where: {pokemon_id: {_eq: $id}}) {
      stat: pokemon_v2_stat {
        name
        base_stat: pokemon_v2_pokemonstats(where: {pokemon_id: {_eq: $id}}, limit: 1) {
          value: base_stat
        }
      }
    }
  }
`;

export const GET_MY_POKEMONS = gql`
  query samplePokeAPIquery($ids: [Int!], $limit: Int, $offset: Int) {
    pokemons: pokemon_v2_pokemonspecies(limit: $limit, offset: $offset, order_by: {name: asc}, where: {id: {_in: $ids}}) {
      name
      id
      color: pokemon_v2_pokemoncolor {
        name
      }
      others: pokemon_v2_pokemons(limit: 1) {
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;
