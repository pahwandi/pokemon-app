import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "layout";
import NotFound from "pages/notFound";
import PokemonList from "pages/pokemonList";
import PokemonDetail from "pages/pokemonDetail";
import MyPokemonList from "pages/myPokemonList";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<PokemonList />}/>
          <Route path="/my-pokemons" element={<MyPokemonList />}/>
          <Route path="/pokemon-detail/:id" element={<PokemonDetail />}/>
          <Route path="*" element={NotFound}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;