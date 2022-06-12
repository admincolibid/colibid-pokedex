import { useEffect, useReducer, useState } from "react";
import Navbar from "./components/Navbar";

import { CssBaseline, Container, SelectChangeEvent } from "@mui/material";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import { PokemonApiResult } from "./utils/types";
import { Pokemon } from "./utils/types/pokemon";
import { PokemonColor } from "./utils/types/pokemonColor";

const pokeResultInitialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export interface PokeReducerState {
  search: string;
  color: string;
}

export type PokeReducerAction =
  | {
      type: "getPokemonBySearch";
      payload: string;
    }
  | {
      type: "getPokemonByColor";
      payload: string;
    }
  | { type: "reset" };

const reducerInitalState: PokeReducerState = {
  search: "",
  color: "all",
};

const pokeApiReducer = (state: PokeReducerState, action: PokeReducerAction) => {
  switch (action.type) {
    case "getPokemonBySearch":
      return { color: "all", search: action.payload };
    case "getPokemonByColor":
      return { search: "", color: action.payload };
    case "reset":
      return reducerInitalState;
    default:
      throw new Error(`type action desconocido (╯°□°）╯︵ ┻━┻)) `);
  }
};

function App() {
  const [state, dispatch] = useReducer(pokeApiReducer, reducerInitalState);
  const [colorOptions, setColorOptions] = useState<PokemonApiResult["results"]>(
    []
  );

  const [pokeResult, setPokeResult] = useState<PokemonApiResult>(
    pokeResultInitialState
  );
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const pokeColorUrl = "https://pokeapi.co/api/v2/pokemon-color/";
    const colorUrl = new URL(pokeColorUrl);
    fetch(colorUrl)
      .then((res) => res.json())
      .then((data: PokemonApiResult) => {
        setColorOptions(data.results);
      });

    const pokeUrl = new URL("https://pokeapi.co/api/v2/pokemon/");
    fetch(pokeUrl)
      .then((res) => res.json())
      .then((data: PokemonApiResult) => {
        return setPokeResult(data as PokemonApiResult);
      })
      .catch((err) => setPokemon(null));
  }, []);

  useEffect(() => {
    if (state.color) {
      const colorUrl = colorOptions.find((c) => c.name === state.color);
      fetch(colorUrl?.url as string)
        .then((res) => res.json())
        .then((data: any) => {
          setPokemon(null);
          setPokeResult((prevPoke) => ({
            ...prevPoke,
            results: data.pokemon_species,
          }));
        });
    } else {
      setPokemon(null);
    }

    if (state.search) {
      const pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + state.search;
      const url = new URL(pokeUrl);
      fetch(url)
        .then((res) => res.json())
        .then((data: PokemonApiResult | Pokemon) => {
          if (!state.search) {
            return setPokeResult(data as PokemonApiResult);
          }
          return setPokemon(data as Pokemon);
        })
        .catch((err) => setPokemon(null));
    }
  }, [colorOptions, state.color, state.search]);

  return (
    <>
      <CssBaseline />
      <Navbar
        pokeStateReducer={{ state, dispatch }}
        colorOptions={{ colorOptions, setColorOptions }}
      />
      <Container
        maxWidth="xl"
        // fixed
        sx={{
          paddingTop: 3,
        }}
      >
        {state.search && (
          <PokemonDetail pokemon={pokemon} search={state.search} />
        )}
        {!state.search && <PokemonList pokeResult={pokeResult} />}
      </Container>
    </>
  );
}

export default App;
